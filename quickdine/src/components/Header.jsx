import React from 'react'
import { useNavigate } from 'react-router'
import "../componentStyles/Header.css"
function Header({loginClicked, setLoginClicked}) {
    const navigate = useNavigate();
  return (
    <div className = "red-box" style={loginClicked ? {opacity:'0.5', filter:'blur(20px)'} : null}>
      <div className='header'>
        <div className='logo'>QUICKDINE</div>
        <div className='mid-navbar'>
          <div className='nav-btn' onClick={() => navigate("/")}>Home</div>
          <div className='nav-btn' onClick={() => navigate("/restaurants")}>Restaurants</div>
          <div className='nav-btn'>About us</div>
          <div className='nav-btn'onClick={() => navigate("/profile")}>Profile</div>
        </div>
        <div className='act-btn' onClick={() => {setLoginClicked(true)}}>Login</div>
      </div>
    </div>
  )
}

export default Header
