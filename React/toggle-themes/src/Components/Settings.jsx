import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext';

function Settings() {
    const { toggleTheme} = useContext(ThemeContext)
    console.log('rendering from settings');
        
    return (
        <div>
            <button onClick={toggleTheme} className='theme-button'>Toggle theme</button>
        </div>
    )
}

export default Settings