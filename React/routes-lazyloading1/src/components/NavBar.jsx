import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
        <div>
        <nav style={styles.nav}>
          <h1>ElectroGadgets</h1>
          <div style={styles.linkContainer}>
            <Link to='/' style={styles.link}>Home</Link>
            <Link to='/cart' style={styles.link}>Cart</Link>
          </div>
        </nav>
    </div>
  )
}

const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#222',
      color: 'white',
      alignItems: 'center'
    },
    link: {
      marginLeft: 20,
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

// const styles = {
//     nav: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '1rem 2rem',
//     backgroundColor: '#1a1a1a',
//     color: '#f0f0f0',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//     fontFamily: 'Segoe UI , Tahoma, Geneva, Verdana, sansSerif',
//   },
  
//   linkContainer:{
//     marginLeft: '1.5rem',
//     color: '#f0f0f0',
//     textDecoration: 'none',
//     fontWeight: 600,
//     transition: 'color 0.3s ease',
//   },
  
//   link: {
//     color: '#00bcd4',
//   }
// }



export default NavBar