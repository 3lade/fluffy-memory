import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import BookRentalList from './components/BookRentalList';
import AddBookRental from './components/AddBookRental';
import EditBookRental from './components/EditBookRental';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<BookRentalList/>}></Route>
          <Route path='/rentals' element={<BookRentalList/>}></Route>
          <Route path='*' element={<BookRentalList/>}></Route>
          <Route path='/add' element={<AddBookRental/>}></Route>
          <Route path='/edit/:id' element={<EditBookRental/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
