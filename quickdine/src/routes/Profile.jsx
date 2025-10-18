import React, { useState, useEffect } from 'react'
import axios from "axios";
import OrderHistoryCard from '../components/OrderHistoryCard';
import "../routeStyles/Profile.css"

function Profile() {
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
        <h2>{name.toUpperCase()}</h2>
        <div className="user-name">Email id : {email_id}</div>
        <div className="user-name">phone number : 1234567890</div>
      </div>

      <OrderHistoryCard/>
        
      <div>Logout</div>
    </div>
  )
}

export default Profile
