import React from "react";
import BookForm from "./BookForm";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { createBook } from "../modules/books/redux/bookSlice";

function AddBook() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleSubmit = (data) => {
        dispatch(createBook(data))
        navigate('/');
  };

  return (
    <div>
      Add Book
      <BookForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default AddBook;
