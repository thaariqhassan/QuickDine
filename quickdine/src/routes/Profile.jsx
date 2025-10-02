import React, { useState, useEffect } from 'react'
import axios from "axios";
import OrderHistoryCard from '../components/OrderHistoryCard';

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
    <>  
      <div className='user-details-container'>
        <div className="user-name">{name}</div>
        <div className="user-name">{email_id}</div>
      </div>
      <div className="list-of-order-history">
        <OrderHistoryCard />
        <OrderHistoryCard />
        <OrderHistoryCard />
        <OrderHistoryCard />
      </div>
        {/*
        orderList.map(order => (
            <div key={order.id}>
                <p>{order.item_name} - ₹{order.price}</p>
            </div>
        ))
        */}
    </>
  )
}

export default Profile
