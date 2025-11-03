import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Meme() {

    const [memeData, setMemeData] = useState([]);

    const API_URL = "https://meme-api.com/gimme"

    const fetchData = async () => {
        try {            
            const response = await axios(API_URL);
            console.log(response.data);
            const Data = response.data;
            setMemeData(Data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        fetchData();
    }, [])

  return (
    <div>
        <h1>Memes mate</h1>
        {memeData && 
        <>
        <img src={memeData.url} alt={memeData.title} style={{width: '500px', height: '500px'}}></img>
        <button onClick={fetchData} className='nextBtn'>Next Page</button>
        </>
        }

    </div>
  )
}

export default Meme