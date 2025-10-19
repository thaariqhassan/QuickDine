import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/Home";
import Restaurants from "./routes/Restaurants";
import RestaurantView from "./routes/RestaurantView";
import Profile from "./routes/Profile";
import Header from "./components/Header";

function Main(){
  const [loginClicked,setLoginClicked] = useState(false);
  return(
  <BrowserRouter>
  <Header loginClicked={loginClicked} setLoginClicked={setLoginClicked}/>
   <Routes>
      <Route path="/" element={<Home loginClicked={loginClicked} setLoginClicked={setLoginClicked}/>} />
      <Route path="/restaurants" element={<Restaurants/>} />
      <Route path="/restaurantview" element={<RestaurantView/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main/>);
