import { Router } from "express";
import { Book } from "../models/book.model.js";

const router = Router();

// route to create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res
      .status(201)
      .json({ message: `Created book ${req.body.title}`, book });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// route to get a single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// route to update a book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .json({ message: "Missing required fields to update" });
    }

    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updateBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Updated the book successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Deleted the book successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

export default router;
