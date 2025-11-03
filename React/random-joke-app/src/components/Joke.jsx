import React from 'react'

function Joke({ setup, punchline, onNextJoke, onAddToFavorites, favorites , joke}) {

    const jokeSetup = joke?.setup || setup;
    const jokepunchline = joke?.punchline || punchline;
    return (
        <div>
            <h1>JOKE OF THE DAY</h1>
            <p>{jokeSetup}</p>
            <p><strong>{jokepunchline}</strong></p>
            <button onClick={onNextJoke}>Next Joke</button>
            <button onClick={onAddToFavorites}>Add to My Fav</button>
            <h2>My Favorites</h2>
            { favorites &&
                favorites.map((joke, idx) => (
                    <div key={idx}>
                        <p>{joke.setup}</p>
                        <p><strong>{joke.punchline}</strong></p>
                    </div>
                ))
            }

        </div>
    )
}

export default Joke