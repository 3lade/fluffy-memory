import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Header from "./components/Header";
import AddBookRental from "./components/AddBookRental";
import BookRentalList from "./components/BookRentalList";
import EditBookRental from "./components/EditBookRental";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to='/rentals'/>}/>
          <Route path="/add" element={<AddBookRental/>}/>
          <Route path="/rentals" element={<BookRentalList/>}/>
          <Route path="/edit/:id" element={<EditBookRental/>}/>
          <Route path="*" element={<Navigate to='/rentals'/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
