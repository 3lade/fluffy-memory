import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Joke from './components/Joke';
import Footer from './components/Footer';

function App() {

  const [funData, setFunData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const API_URL = "https://official-joke-api.appspot.com/random_joke"

  const fetchNextJoke = async () => {
    try {   
      const response = await axios.get(API_URL)
      console.log(response)
      const finalData = response.data;
      setFunData(finalData)
      const setup = finalData.setup;
      console.log(setup)
      const punchline = finalData.punchline;
      console.log(punchline)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchNextJoke()
  }, [])

  const onAddToFavorites = async () => {
      // await axios.post("https://official-joke-api.appspot.com/favorites", funData)
      if(funData.setup && funData.punchline)
      {
        setFavorites([...favorites, funData])
      }
    }


  return (
    <div className="App">
        <Header/>
        <Joke setup={funData.setup} punchline={funData.punchline} onNextJoke={fetchNextJoke} onAddToFavorites={onAddToFavorites} favorites={favorites} joke={funData}/>
        <Footer/>
    </div>
  );
}

export default App;
