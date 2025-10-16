import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/Home";
import Restaurants from "./routes/Restaurants";
import RestaurantView from "./routes/RestaurantView";
import Profile from "./routes/Profile";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/restaurants" element={<Restaurants/>} />
      <Route path="/restaurantview" element={<RestaurantView/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  </BrowserRouter>,
);
