import React, {useState} from 'react';

import { useNavigate } from 'react-router';

import "../routeStyles/Home.css";
import "../routeStyles/Restaurant.css";

import restaurantimage from "../assets/images/restaurant.jpg";

// Common widgets
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Card widgets
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

// Dummy data for comments
const comments = [
{
  cid: 1,
  username: "Thaariq",
  rating: 3.0,
  comment: "Too expensive, my wallet was literaly empty after I ate here, this is extortion"
},
{
  cid: 2,
  username: "Abhay",
  rating: 4.0,
  comment: "Good restaurant and atmosphere"
},
{
  cid: 3,
  username: "Yohaan",
  rating: 4.0,
  comment: "Good"
},
{
  cid: 4,
  username: "Ajay",
  rating: 1.0,
  comment: "Scam"
},
{
  cid: 5,
  username: "John Cena",
  rating: 4.0,
  comment: "Bing chilling ice cream is available"
},
{
  cid: 6,
  username: "Gordon Ramsay",
  rating: 1.0,
  comment: "The chicken was raw"
}
]

function RestaurantView(){
  const navigate = useNavigate();

  const [imageIndex, setImageIndex] = useState(0);

  const imageList = [
    restaurantimage
  ];

  const handleImageChange = (event, newIndex) =>{
    setImageIndex(newIndex);
  };

  const avatarColors = [
    "#F44336", // Red
    "#E91E63", // Pink
    "#9C27B0", // Purple
    "#673AB7", // Deep Purple
    "#3F51B5", // Indigo
    "#2196F3", // Blue
    "#03A9F4", // Light Blue
    "#00BCD4", // Cyan
    "#009688", // Teal
    "#4CAF50", // Green
    "#8BC34A", // Light Green
    "#CDDC39", // Lime
    "#FFEB3B", // Yellow
    "#FFC107", // Amber
    "#FF9800", // Orange
    "#FF5722", // Deep Orange
    "#795548", // Brown
    "#9E9E9E", // Grey
    "#607D8B"  // Blue Grey
  ];

  function getRandomAvatarColor() {
    const randomIndex = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[randomIndex];
  }


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

    {
        /*
        const columnStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "16px", // Optional: spacing between columns
        alignItems: "flex-start", // Optional: horizontal alignment
        width: "100%", // Optional: full width
        };
        */
    }

    <div className='restaurant-body'>
      <div> {/*main box*/}
        <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start", height: "100%", width: "100%"}}> {/*horizontal box*/}
            <div style={{flex: 1, display: "flex", height: "80vh"}}>
              <img
                  src={imageList[imageIndex]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
                <Card>
                  <CardContent sx={{paddingBottom: "1px"}}>
                    <Typography variant="h4">
                      Hotel Name
                    </Typography>
                    <Typography>
                      Description
                    </Typography>
                  </CardContent>
                  <CardContent sx={{paddingBottom: "1px"}}>
                    <Chip label="Cuisine"/>
                    <Chip label="Type"/>
                    <Chip label="Halal"/>
                  </CardContent>
                  <CardContent sx={{paddingBottom: "1px"}}>
                    <Typography variant="h6">
                      ₹ 500 - 1000
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Button variant="contained">
                      Order
                    </Button>
                    <Button variant="contained">
                      View location
                    </Button>
                  </CardContent>
                </Card>
            </div>
        </div>
        <div>
          <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
            <Typography variant="h4">
              Reviews
            </Typography>
            <Typography sx={{paddingLeft: "10px"}}>
              4.9
            </Typography>
            {/*stars*/}
          </div>
          <div>
            {/*Comments*/}
            <Grid container spacing={2}>
            {
              comments.map((comment,index)=>(
                  <Grid item key={comment.cid}>
                    <Card>
                      {/*
                      <CardContent>
                        <Typography variant="h6">
                          {comment.username}
                        </Typography>
                        <Typography variant="h6">
                          {comment.rating}/5
                        </Typography>
                      </CardContent>
                      */}
                      <CardHeader
                        avatar={
                          <Avatar sx={{bgcolor: getRandomAvatarColor()}}>
                            {comment.username[0]}
                          </Avatar>
                        }
                        title={comment.username}
                      />
                      <CardContent>
                        <Typography>
                          {comment.comment}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
            )
            }
            </Grid>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default RestaurantView
