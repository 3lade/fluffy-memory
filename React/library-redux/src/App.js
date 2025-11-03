import './App.css';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import BookPage from './components/BookPage';
import UpdateBook from './components/UpdateBook';
import NavBar from './components/NavBar';
import AddBook from './components/AddBook';
function App() {
  
  return (

    <Router>
        <NavBar/>
        <Routes>
            <Route path='/' element = {<BookPage/>}></Route>
            <Route path='/add' element = {<AddBook/>}></Route>
            <Route path='/edit/:id' element = {<UpdateBook/>}></Route>
        </Routes>
    </Router>

  );
}

export default App;
