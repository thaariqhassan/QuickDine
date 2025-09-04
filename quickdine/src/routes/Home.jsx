import React from 'react'
import "../routeStyles/Home.css"
import Card from '../components/Card'
function Home() {
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
    <div className = "red-box">
      <div className='header'>
        <div className='logo'>QUICKDINE</div>
        <div className='mid-navbar'>
          <div className='nav-btn'>Home</div>
          <div className='nav-btn'>Restaurants</div>
          <div className='nav-btn'>About us</div>
          <div className='nav-btn'>Blog</div>
        </div>
        <div className='act-btn'>Login</div>
      </div>
      <div className='body-section'>
        <div className="tagline">
          <h2>Dine Smarter, Reserve Faster.</h2>
          <i>Easily discover restaurants and reserve your table in just a few clicks.</i>
        </div>
        <div className="pplimg">
          <img
          src='https://www.impruvellc.com/wp-content/uploads/2023/07/Relaxed-Decor-Casual-Dress-Code-800x379.jpg'
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
    </>
  )
}

export default Home