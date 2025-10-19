import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../routeStyles/Home.css"
import restaurantimage from "../assets/images/restaurant.jpg"
import Card from '../components/Card'
import LoginCard from '../components/LoginCard'
function Home({loginClicked, setLoginClicked, setAccess}){
  
  const features = [
    {
      heading : "Explore Restaurants",
      content : "Discover top-rated restaurants, browse menus, and find the perfect dining spot tailored to your taste—all in one place"
    },
    {
      heading : "Instant Booking Confirmation",
      content : "Get your table reserved in seconds with real-time confirmation—no waiting, no hassle."
    },
    {
      heading : "Personalized Recommendations",
      content : "Receive smart dining suggestions based on your cuisine preferences, location, and past bookings."
    }
  ];
  return (
  <>
  <div className='Outer-Home' style={loginClicked ? {opacity:'0.5', filter:'blur(20px)'} : null}>
    <div className = "red-box">
      <div className='body-section'>
        <div className="tagline">
          <h2>Dine Smarter, Reserve Faster.</h2>
          <i>Easily discover restaurants and reserve your table in just a few clicks.</i>
        </div>
        <div className="pplimg">
          <img
          src={restaurantimage}
          className='imageppl'></img>
        </div>
      </div>
    </div>
    <div className="lower-layer">
      {
        features.map((feature,index) =>{
          return(
          <Card key={index} props={feature}/>
        )})
      }
    </div>
  </div>
  <LoginCard
    className="login-card"
    showLoginCard={loginClicked}
    closeLoginCard = {() => setLoginClicked(false)}
    setAccess={setAccess}
  />
  </>
  )
}

export default Home