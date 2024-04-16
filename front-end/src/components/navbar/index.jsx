import React from 'react'
import './style.css'

function NavbarComponent({ user }) {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <nav>
      <div className="logo">Another Social App</div>
      <div className="user">
        <img src={user.picture} alt="User" className="user-pic" />
        <span className="user-name">{user.name}</span>
        <button className='logout' onClick={logout}>logout</button>
      </div>
    </nav>
  )
}

export default NavbarComponent