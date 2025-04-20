import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import "../styles/NavBar.css"

function NavBar() {

    const { user } = useAuthContext()
  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      {user ? (<button className='logout' onClick={handleLogout}>Log Out</button>) : (<a href="/"><button className='logout'>Log In</button></a>)}
    </div>
  )
}

export default NavBar
