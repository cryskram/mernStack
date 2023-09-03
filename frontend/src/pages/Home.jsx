import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsBookHalf, BsInfoCircle } from "react-icons/bs";
import {
  MdAccountCircle,
  MdOutlineAddBox,
  MdOutlineDelete,
} from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-around items-center">
        <h1 className="text-3xl my-8">Books Store - MERN</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        // <table className="w-full border-separate border-spacing-2">
        //   <thead>
        //     <tr>
        //       <th className="border border-slate-600 rounded-md">No</th>
        //       <th className="border border-slate-600 rounded-md">Title</th>
        //       <th className="border border-slate-600 rounded-md max-md:hidden">
        //         Author
        //       </th>
        //       <th className="border border-slate-600 rounded-md max-md:hidden">
        //         Publish Year
        //       </th>
        //       <th className="border border-slate-600 rounded-md">Operations</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {books.map((book, idx) => (
        //       <tr key={book._id} className="h-8">
        //         <td className="border border-slate-700 rounded-md text-center">
        //           {idx + 1}
        //         </td>
        //         <td className="border border-slate-700 rounded-md text-center">
        //           {book.title}
        //         </td>
        //         <td className="border border-slate-700 rounded-md text-center max-md:hidden">
        //           {book.author}
        //         </td>
        //         <td className="border border-slate-700 rounded-md text-center max-md:hidden">
        //           {book.publishYear}
        //         </td>
        //         <td className="border border-slate-700 rounded-md text-center">
        //           <div className="flex justify-center gap-x-4">
        //             <Link to={`/books/details/${book._id}`}>
        //               <BsInfoCircle className="text-2xl text-green-800" />
        //             </Link>
        //             <Link to={`/books/edit/${book._id}`}>
        //               <AiOutlineEdit className="text-2xl text-yellow-600" />
        //             </Link>
        //             <Link to={`/books/delete/${book._id}`}>
        //               <MdOutlineDelete className="text-2xl text-red-600" />
        //             </Link>
        //           </div>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="border-2 border-slate-600 p-4 rounded-2xl"
            >
              <div className="flex justify-center items-center gap-4">
                <h3 className="text-xlg text-gray-500">{book._id}</h3>
                <h3 className="bg-red-400 px-4 py-1 text-white rounded-xl">
                  {book.publishYear}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <BsBookHalf className="text-red-400 text-xl" />
                <h1 className="text-slate-900 font-semibold">{book.title}</h1>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MdAccountCircle className="text-red-400 text-xl" />
                <h1 className="text-slate-900 font-semibold">{book.author}</h1>
              </div>
              <div className="flex items-center justify-evenly mt-6">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-3xl bg-green-500 p-1 rounded-full text-white" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-3xl bg-yellow-500 p-1 rounded-full" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-3xl bg-red-500 p-1 rounded-full text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
