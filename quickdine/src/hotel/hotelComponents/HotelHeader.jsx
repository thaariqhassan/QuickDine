import React from 'react'
import { useNavigate } from 'react-router'
import "../../componentStyles/Header.css"
function HotelHeader() {
    const navigate = useNavigate();
  return (
    <div className = "red-box">
      <div className='header'>
        <div className='logo'>QUICKDINE</div>
        <div className='mid-navbar'>
          <div className='nav-btn' onClick={() => navigate("/")}>Home</div>
          <div className='nav-btn' onClick={() => {navigate("/dashboard")}}>Dashboard</div>
          <div className='nav-btn' onClick={() => navigate("/about")}>About us</div>
          <div className='nav-btn'onClick={() =>{navigate("/profile")}}>Profile</div>
        </div>
        <div className='act-btn' onClick={() => {navigate("/dashboard")}}>Reservations</div>
      </div>
    </div>
  )
}

export default HotelHeader
