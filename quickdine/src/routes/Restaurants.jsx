import React from 'react';

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

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// Card widgets
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

function Restaurants(){
  const navigate = useNavigate();

  // States
  // Filters
  const [filters, setFilter] = React.useState("price-lh");
  const handleFilters = (event, newFilter)=> {
    setFilter(newFilter);
  };

  // Price
  const [priceValue, setPriceValue] = React.useState([0, 1000]);
  const handlePriceValue = (event, newPriceValue) => {
    setPriceValue(newPriceValue);
  };

  // Distance
  const [distanceValue, setDistanceValue] = React.useState([0, 100]);
  const handleDistanceValue = (event, newDistanceValue) => {
    setDistanceValue(newDistanceValue);
  };

  // Food types
  const [foodtypes, setFoodtype] = React.useState(() => ["veg", "nonveg"]);
  const handleFoodtype = (event, newFoodtypes)=> {
    setFoodtype(newFoodtypes);
  };

  // Halal
  const [halal, setHalal] = React.useState(() => ["yes", "no"]);
  const handleHalal = (event, newHalal)=> {
    setHalal(newHalal);
  };

  // Cuisine
  const [cuisines, setCuisine] = React.useState(() => ["chinese", "multi-cuisine", "middle-eastern", "north-indian", "south-indian"]);
  const handleCuisine = (event, newCuisine)=> {
    setCuisine(newCuisine);
  };

  // Dummy data
  const restaurants = [
    {
      rid:"1",
      name:"Mamma's",
      cuisine:"Multi-cuisine",
      type:"Non-veg",
      halal:"no",
      description:"An upscale casual restaurant providing a relaxed yet refined dining experience, specializing in a fusion of Indian and Continental dishes with an emphasis on fresh ingredients and elegant presentation."
    },
    {
      rid:"2",
      name:"MaxFun",
      cuisine:"Multi-cuisine",
      type:"Non-veg",
      halal:"no",
      description:"A vibrant and lively casual dining spot, popular among youth and families, known for its diverse menu featuring fast food, quick bites, and fun, customizable dishes."
    },
    {
      rid:"3",
      name:"Dine Inn Kasa",
      cuisine:"Multi-cuisine",
      type:"Non-veg",
      halal:"no",
      description:"An upscale casual restaurant providing a relaxed yet refined dining experience, specializing in a fusion of Indian and Middle-eastern dishes with an emphasis on fresh ingredients and elegant presentation."
    },
    {
      rid:"4",
      name:"Arabian Palace",
      cuisine:"Middle Eastern",
      type:"Non-veg",
      halal:"yes",
      description:"An authentic Middle Eastern restaurant renowned for its succulent grilled meats, aromatic biryanis, traditional mandi, and a wide array of Arabic appetizers, providing a rich culinary journey."
    },
    {
      rid:"5",
      name:"Farha",
      cuisine:"South Indian",
      type:"Non-veg",
      halal:"yes",
      description:"A local favorite known for its simple yet delicious and affordable snacks and biriyanis."
    },
    {
      rid:"6",
      name:"Maggie Bakery & Restaurant",
      cuisine:"South Indian",
      type:"Non-veg",
      halal:"no",
      description:"A charming local spot that combines a popular bakery with a casual restaurant, offering a range of fresh baked goods, snacks, and popular Indian comfort food dishes, often including quick meals."
    },
    {
      rid:"7",
      name:"Portico",
      cuisine:"Multi-cuisine",
      type:"Non-veg",
      halal:"no",
      description:"A sophisticated and modern open air restaurant, offering a curated menu of international or contemporary Indian cuisine in an elegant setting."
    },
    {
      rid:"8",
      name:"Dadwi Cafe",
      cuisine:"South Indian",
      type:"Veg",
      halal:"-",
      description:"A trendy and relaxed cafe, perfect for a casual hangout, serving a variety of coffees, teas, light snacks, sandwiches, and perhaps some baked goods, with a cozy ambiance."
    },
    {
      rid:"9",
      name:"Kubaba",
      cuisine:"Middle Eastern",
      type:"Non-veg",
      halal:"yes",
      description:"A distinctive restaurant specializing in authentic Mediterranean and Middle Eastern cuisine, with a focus on Levantine dishes like kebabs, hummus, falafel, and other aromatic preparations."
    },
    {
      rid:"10",
      name:"Saravana Bhavan",
      cuisine:"South Indian",
      type:"Veg",
      halal:"-",
      description:"A globally recognized vegetarian restaurant chain, famous for its extensive menu of authentic South Indian vegetarian dishes, especially various types of dosas, idlis, vadas, and traditional thalis."
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

    <div className='restaurant-body'>
      <div className='restaurant-body-sidebar'>
        <Typography variant="h6">
          Filters
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1
        }}>
          <Button variant="outlined">Apply</Button>
          <Button variant="outlined">Reset</Button>
        </Box>

        <Typography variant="h6">
          Price
        </Typography>
        <Slider
          value={priceValue}
          onChange={handlePriceValue}
          valueLabelDisplay="auto"
          max={1000}
        />

        <Typography variant="h6">
          Distance
        </Typography>
        <Slider
          value={distanceValue}
          onChange={handleDistanceValue}
          valueLabelDisplay="auto"
        />

        <Typography variant="h6">
          Rating
        </Typography>
        <Rating>
        </Rating>

        <Typography variant="h6">
          Type
        </Typography>
        <ToggleButtonGroup
          value={foodtypes}
          onChange={handleFoodtype}
          sx={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <ToggleButton value="veg">
            Veg
          </ToggleButton>
          <ToggleButton value="nonveg">
            Non-veg
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="h6">
          Halal
        </Typography>
        <ToggleButtonGroup
          value={halal}
          onChange={handleHalal}
          sx={{
          display: "flex",
          flexWrap: "wrap"
        }}>
          <ToggleButton value="yes">
            Yes
          </ToggleButton>
          <ToggleButton value="no">
            No
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="h6">
          Cuisine
        </Typography>
        <ToggleButtonGroup
          value={cuisines}
          onChange={handleCuisine}
          sx={{
          display: "flex",
          flexWrap: "wrap"
        }}>
          <ToggleButton value="chinese">
            Chinese
          </ToggleButton>
          <ToggleButton value="multi-cuisine">
            Multi-cuisine
          </ToggleButton>
          <ToggleButton value="middle-eastern">
            Middle Eastern
          </ToggleButton>
          <ToggleButton value="north-indian">
            North Indian
          </ToggleButton>
          <ToggleButton value="south-indian">
            South Indian
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className='restaurant-body-content'>
        {
          <Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography>
              Sort by
            </Typography>
            <ToggleButtonGroup
              value={filters}
              exclusive
              onChange={handleFilters}
              sx={{
              display: "flex",
              flexWrap: "wrap"
            }}>
              <ToggleButton value="price-hl">
                Price: High to low
              </ToggleButton>
              <ToggleButton value="price-lh">
                Price: Low to high
              </ToggleButton>
              <ToggleButton value="distance">
                Distance
              </ToggleButton>
              <ToggleButton value="rating">
                Rating
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={4} justifyContent="center">
          {
            restaurants.map((restaurant,index) =>{
              return(
                <Grid item key={restaurant.rid}>
                  <Card style={{width:"100%"}} key={index} sx={{maxWidth: 300}}>
                    <CardContent>
                      <CardMedia component="img" height="150" image={restaurantimage} alt="Restaurant Image">
                      </CardMedia>
                    </CardContent>
                    <CardContent>
                      <Typography variant="h6">
                        {restaurant.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Chip label={restaurant.cuisine}/>
                      <Chip label={restaurant.type}/>
                      {
                        (restaurant.halal==="yes" && <Chip label="Halal"/>)
                      }
                    </CardActions>
                  </Card>
                </Grid>
              )})
          }
          </Grid>
          </Box>
        }
      </div>
    </div>
    </>
  )
}

export default Restaurants
