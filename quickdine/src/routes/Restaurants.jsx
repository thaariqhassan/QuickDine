import React from 'react';

import { useNavigate } from 'react-router';
import "../routeStyles/Home.css";

import restaurantimage from "../assets/images/restaurant.jpg";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

function Restaurants(){
  const navigate = useNavigate();
  const restaurants = [
    {
      name : "Maggie Bakery & Restaurant",
      description : "Charming local spot that combines a popular bakery with a casual restaurant, offering a range of fresh baked goods, snacks, and popular Indian comfort food dishes,"
    },
  ];
  return (
    <>
    <div className = "red-box">
      <div className='header'>
        <div className='logo'>QUICKDINE</div>
        <div className='mid-navbar'>
          <div className='nav-btn'>Home</div>
          <div className='nav-btn' onClick={() => navigate("/restaurants")}>Restaurants</div>
          <div className='nav-btn'>About us</div>
          <div className='nav-btn'>Blog</div>
        </div>
        <div className='act-btn'>Login</div>
      </div>
    </div>

    <div className='body-section'>
      {
        restaurants.map((restaurant,index) =>{
          return(
          <Card key={index} sx={{maxWidth: 300}}>
            <CardContent>
              <Typography>
                {restaurant.name}
              </Typography>
            </CardContent>
          </Card>
        )})
      }
    </div>
    </>
  )
}

export default Restaurants
