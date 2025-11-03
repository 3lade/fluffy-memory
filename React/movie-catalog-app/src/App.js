import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
// import MovieCard from './components/MovieCard';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      {/* <MovieCard /> */}
      <Header />
      <MovieList />
      <Footer />
    </div>
  );
}

export default App;
