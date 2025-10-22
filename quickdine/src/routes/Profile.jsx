import React, { useState, useEffect } from 'react'
import axios from "axios";
import OrderHistoryCard from '../components/OrderHistoryCard';
import {useNavigate} from "react-router";
import "../routeStyles/Profile.css"

function Profile({ handleLogout }) {
    const navigate = useNavigate();
    const name = localStorage.getItem("user_name");
    const email_id = localStorage.getItem("user_email");
  
    
  return(
    <div className='Profile-layout'> 
      
      <div className='user-details-container'>
        <h2>{ name? name.toUpperCase():"Not loged in"}</h2>
        <div className="user-name">Email id : {email_id}</div>
        <div className="user-name">phone number : 1234567890</div>
      </div>

      <OrderHistoryCard/>
        
      <div>
        <button className="logout-btn" onClick={() =>{
            handleLogout();
            navigate("/");
          }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile
