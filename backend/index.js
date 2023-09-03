import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import { Book } from "./models/book.model.js";
import bookRoute from "./routes/book.routes.js";

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/books", bookRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "MERN homepage" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("[DATABASE] Connected Successfully");
    app.listen(PORT, () => {
      console.log("[SERVER] Server is running");
    });
  })
  .catch((e) => {
    console.log("[DATABASE] Connection Failed");
    console.log(`[ERROR] ${e}`);
  });
