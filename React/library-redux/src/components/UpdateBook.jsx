import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllBooks } from "../modules/books/services/bookServices";
import { editBook } from "../modules/books/redux/bookSlice";

function UpdateBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const loadBooks = async () => {
    const books = await getAllBooks();
    const found = books.find((book) => book.id === id);
    if (found) {
      setBook(found);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleUpdate = (newData) => {
    dispatch(editBook(id, newData))
    navigate('/')
  };

  return (
    <div>
      Update Book
      <BookForm initialData={book} onSubmit={handleUpdate} />
    </div>
  );
}

export default UpdateBook;
