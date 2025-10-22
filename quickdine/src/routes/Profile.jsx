import React, { useState, useEffect } from 'react'
import axios from "axios";
import OrderHistoryCard from '../components/OrderHistoryCard';
import {useNavigate} from "react-router";
import "../routeStyles/Profile.css"

function Profile({ handleLogout }) {
    const navigate = useNavigate();
    const name = localStorage.getItem("user_name");
    const email_id = localStorage.getItem("user_email");
    const profile_id = localStorage.getItem("user_id");
    const [orderList,setOrderList] = useState([]);
    //get order history
    useEffect(() => {
    axios.get(`http://127.0.0.1:8000/orders/${profile_id}`)
      .then(res => setOrderList(res.data))
      .catch(err => console.error(err));
  }, []);
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
