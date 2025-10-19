import React from 'react'
import "../componentStyles/Header.css"
function Header() {
  return (
    <div className = "red-box">
      <div className='header'>
        <div className='logo'>QUICKDINE</div>
        <div className='mid-navbar'>
          <div className='nav-btn'>Home</div>
          <div className='nav-btn' /*onClick={/*() => navigate("/restaurants")}*/>Restaurants</div>
          <div className='nav-btn'>About us</div>
          <div className='nav-btn'/*onClick={() => navigate("/profile")}*/>Profile</div>
        </div>
        <div className='act-btn' /*onClick={() => {setLoginClicked(true)}}*/>Login</div>
      </div>
    </div>
  )
}

export default Header
