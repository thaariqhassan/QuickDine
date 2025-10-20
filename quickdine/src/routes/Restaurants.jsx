import React from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js"

import "../routeStyles/Restaurant.css";

import restaurantimage from "../assets/images/restaurant.jpg";

import {
  Button,
  Typography,
  Chip,
  Grid,
  Box,
  Slider,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  Paper,
  Divider,
} from "@mui/material";

// Reusable ToggleButtonGroup for filters
const FilterToggleGroup = ({ title, value, onChange, options }) => (
  <Box className="filter-section">
    <Typography variant="subtitle1" className="filter-title">
      {title}
    </Typography>
    <ToggleButtonGroup
      value={value}
      onChange={onChange}
      className="filter-toggle-group"
    >
      {options.map((option) => (
        <ToggleButton 
          key={option.value} 
          value={option.value}
          className="filter-toggle-button"
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Box>
);

function Restaurants() {
  const navigate = useNavigate();

  // Filters
  const [filters, setFilters] = React.useState("price-lh");
  const handleFilters = (event, newFilter) => setFilters(newFilter);

  // Price
  const [priceValue, setPriceValue] = React.useState([0, 1000]);
  const handlePriceValue = (event, newValue) => setPriceValue(newValue);

  // Distance
  const [distanceValue, setDistanceValue] = React.useState([0, 100]);
  const handleDistanceValue = (event, newValue) => setDistanceValue(newValue);

  // Rating
  const [ratingValue, setRatingValue] = React.useState(0);

  // Food types
  const [foodtypes, setFoodtypes] = React.useState(["veg", "nonveg"]);
  const handleFoodtypes = (event, newValue) => setFoodtypes(newValue);

  // Halal
  const [halal, setHalal] = React.useState(["yes", "no"]);
  const handleHalal = (event, newValue) => setHalal(newValue);

  // Cuisine
  const [cuisines, setCuisines] = React.useState([
    "chinese",
    "multi-cuisine",
    "middle-eastern",
    "north-indian",
    "south-indian",
  ]);
  const handleCuisines = (event, newValue) => setCuisines(newValue);

  // Fetching of restaurants from database
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/list");
        setRestaurants(response.data);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-page">
      <div className="restaurant-container">
        {/* Sidebar Filters */}
        <Paper className="restaurant-sidebar" elevation={2}>
          <div className="sidebar-header">
            <Typography variant="h5" className="sidebar-title">
              Filters
            </Typography>
            <Box className="filter-actions">
              <Button variant="contained" size="small" className="apply-btn">
                Apply
              </Button>
              <Button variant="outlined" size="small" className="reset-btn">
                Reset
              </Button>
            </Box>
          </div>

          <Divider sx={{ my: 2 }} />

          <div className="sidebar-content">
            {/* Price */}
            <Box className="filter-section">
              <Typography variant="subtitle1" className="filter-title">
                Price Range
              </Typography>
              <Slider 
                value={priceValue} 
                onChange={handlePriceValue} 
                valueLabelDisplay="auto" 
                max={1000}
                className="filter-slider"
              />
              <Box className="range-values">
                <Typography variant="body2">₹{priceValue[0]}</Typography>
                <Typography variant="body2">₹{priceValue[1]}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Distance */}
            <Box className="filter-section">
              <Typography variant="subtitle1" className="filter-title">
                Distance (km)
              </Typography>
              <Slider 
                value={distanceValue} 
                onChange={handleDistanceValue} 
                valueLabelDisplay="auto"
                className="filter-slider"
              />
              <Box className="range-values">
                <Typography variant="body2">{distanceValue[0]} km</Typography>
                <Typography variant="body2">{distanceValue[1]} km</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Rating */}
            <Box className="filter-section">
              <Typography variant="subtitle1" className="filter-title">
                Minimum Rating
              </Typography>
              <Rating 
                value={ratingValue}
                onChange={(event, newValue) => setRatingValue(newValue)}
                size="large"
                className="filter-rating"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Type */}
            <FilterToggleGroup
              title="Food Type"
              value={foodtypes}
              onChange={handleFoodtypes}
              options={[
                { value: "veg", label: "Veg" },
                { value: "nonveg", label: "Non-veg" },
              ]}
            />

            <Divider sx={{ my: 2 }} />

            {/* Halal */}
            <FilterToggleGroup
              title="Halal"
              value={halal}
              onChange={handleHalal}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />

            <Divider sx={{ my: 2 }} />

            {/* Cuisine */}
            <FilterToggleGroup
              title="Cuisine"
              value={cuisines}
              onChange={handleCuisines}
              options={[
                { value: "chinese", label: "Chinese" },
                { value: "multi-cuisine", label: "Multi-cuisine" },
                { value: "middle-eastern", label: "Middle Eastern" },
                { value: "north-indian", label: "North Indian" },
                { value: "south-indian", label: "South Indian" },
              ]}
            />
          </div>
        </Paper>

        {/* Main Content */}
        <Box className="restaurant-content">
          {/* Sort By */}
          <Paper className="sort-section" elevation={1}>
            <Typography variant="subtitle1" className="sort-label">
              Sort by:
            </Typography>
            <ToggleButtonGroup 
              value={filters} 
              exclusive 
              onChange={handleFilters}
              className="sort-toggle-group"
            >
              <ToggleButton value="price-hl" className="sort-toggle-button">
                Price: High to Low
              </ToggleButton>
              <ToggleButton value="price-lh" className="sort-toggle-button">
                Price: Low to High
              </ToggleButton>
              <ToggleButton value="distance" className="sort-toggle-button">
                Distance
              </ToggleButton>
              <ToggleButton value="rating" className="sort-toggle-button">
                Rating
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>

          {/* Restaurant Cards */}
          <Grid container spacing={3} className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                <Card className="restaurant-card" elevation={3}>
                  <CardActionArea onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={restaurant.image}
                      alt={restaurant.name}
                      className="restaurant-card-image"
                    />
                    <CardContent className="restaurant-card-content">
                      <Typography variant="h6" className="restaurant-name">
                        {restaurant.name}
                      </Typography>
                      
                      <Box className="restaurant-info">
                        <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          {restaurant.rating}
                        </Typography>
                      </Box>

                      <Box className="restaurant-meta">
                        <Typography variant="body2" color="text.secondary">
                          💰 {restaurant.price} for two
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📍 {restaurant.address}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions className="restaurant-card-actions">
                      <Chip label={restaurant.cuisine} size="small" color="primary" variant="outlined" />
                      <Chip label={restaurant.type} size="small" color="secondary" variant="outlined" />
                      {restaurant.halal === "yes" && (
                        <Chip label="Halal" size="small" color="success" variant="outlined" />
                      )}
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Restaurants;