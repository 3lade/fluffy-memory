import React from 'react'
import AuthContext from '../contexts/AuthContext'

function AuthProvider({children}) {
    console.log('rendering from AuthProv');
    return(
        <AuthContext.Provider value={{isAuthenticated: true, userName: 'Yeshwanth'}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider