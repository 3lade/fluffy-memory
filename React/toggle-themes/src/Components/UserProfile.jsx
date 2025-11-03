import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

function UserProfile() {
    console.log('rendering from UserProfile');
    const {userName} = useContext(AuthContext)
  return (
    <div>
        <h1>Current User - {userName}</h1>
    </div>
  )
}

export default UserProfile