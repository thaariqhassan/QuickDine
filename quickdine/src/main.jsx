import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate} from "react-router";
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

  // Logout function
  const handleLogout = () => {
    // 1️⃣ Clear local storage
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");

    // 2️⃣ Reset login-related state
    setAccess(false);
    setIsRestaurant(false);

    // 4️⃣ Optional message
    alert("Logged out successfully");
  };


  return(
  <BrowserRouter>
  {/*<HotelHeader/>*/}{isRestaurant? <HotelHeader/>:<Header loginClicked={loginClicked} setLoginClicked={setLoginClicked} access={access}/>}
   <Routes>
      <Route path="/" element={<Home loginClicked={loginClicked} setLoginClicked={setLoginClicked} setAccess={setAccess} setIsRestaurant={setIsRestaurant}/>} />
      <Route path="/restaurants" element={<Restaurants/>}/>
      <Route path="/registerRestaurant" element={<RegisterRestaurant/>}/>
      <Route path="/restaurants/:id" element={<RestaurantView/>} />
      <Route path="/profile" element={<Profile handleLogout={handleLogout}/>} />
      <Route path='/about'  element={<About/>}/>
      <Route path="/dashboard" element={<HotelDashboard/>}/>
    </Routes>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main/>);
