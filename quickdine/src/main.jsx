import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/Home";
import Restaurants from "./routes/Restaurants";
import RestaurantView from "./routes/ordering/orderRoutes/RestaurantView";
import Profile from "./routes/Profile";
import Header from "./components/Header";
import About from './routes/About';
import HotelDashboard from "./hotel/hotelRoutes/HotelDashboard";
import HotelHeader from "./hotel/hotelComponents/HotelHeader";
import RegisterRestaurant from './hotel/RegisterRestaurant';

function Main(){
  const [loginClicked,setLoginClicked] = useState(false);
  const [access, setAccess] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  return(
  <BrowserRouter>
  <HotelHeader/>{/*isRestaurant? <HotelHeader/>:<Header loginClicked={loginClicked} setLoginClicked={setLoginClicked} access={access}/>*/}
   <Routes>
      <Route path="/" element={<Home loginClicked={loginClicked} setLoginClicked={setLoginClicked} setAccess={setAccess} setIsRestaurant={setIsRestaurant}/>} />
      <Route path="/restaurants" element={<Restaurants/>}/>
      <Route path="/registerRestaurant" element={<RegisterRestaurant/>}/>
      <Route path="/restaurants/:id" element={<RestaurantView/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path='/about'  element={<About/>}/>
      <Route path="/dashboard" element={<HotelDashboard/>}/>
    </Routes>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main/>);
