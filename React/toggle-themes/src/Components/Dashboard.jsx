import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import AuthContext from '../contexts/AuthContext';

function Dashboard() {
    console.log('rendering from Dashboard');

    const { theme } = useContext(ThemeContext);
    const { isAuthenticated, userName } = useContext(AuthContext)

    const themeChange = {
         color: theme === 'light' ? 'black' : 'white'
    }


    return (
        <div>
            {isAuthenticated && <h1 style={themeChange}>Welcome {userName} and you chose {theme} theme!</h1>}
        </div>
    )
}

export default Dashboard