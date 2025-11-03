import { useEffect, useState } from "react"
import ThemeContext from "../contexts/ThemeContext"

function ThemeProvider({children}) {
    console.log('rendering from ThemeProv');

    const [theme, setTheme] = useState('light')

    const toggleTheme=()=>{
        setTheme( theme=== 'light'? 'dark' : 'light');
    }
    useEffect(() => {
      document.body.style.backgroundColor = theme === 'light' ? 'white' : '#121212'
      document.body.style.color = theme === 'light' ? 'black' : 'white'
    }, [theme])
    

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider