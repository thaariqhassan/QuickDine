import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";
import "../routeStyles/Restaurant.css";
import restaurantimage from "../assets/images/restaurant.jpg";
import {
  Button,
  Typography,
  Chip,
  Box,
  Slider,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  LocationOn,
  AttachMoney,
  Star,
} from "@mui/icons-material";

// Reusable ToggleButtonGroup for filters
const FilterToggleGroup = ({ title, value, onChange, options }) => (
  <Box className="filter-section">
    <Typography variant="subtitle1" className="filter-title" sx={{ fontWeight: 600, mb: 1.5 }}>
      {title}
    </Typography>
    <ToggleButtonGroup
      value={value}
      onChange={onChange}
      exclusive={false}
      className="filter-toggle-group"
      sx={{ flexWrap: 'wrap', gap: 1 }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          className="filter-toggle-button"
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px !important',
            px: 2,
            py: 0.75,
            textTransform: 'none',
          }}
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
  const [filters, setFilters] = useState("price-lh");
  const handleFilters = (event, newFilter) => {
    if (newFilter !== null) setFilters(newFilter);
  };

  // Price
  const [priceValue, setPriceValue] = useState([0, 1000]);
  const handlePriceValue = (event, newValue) => setPriceValue(newValue);

  // Distance
  const [distanceValue, setDistanceValue] = useState([0, 100]);
  const handleDistanceValue = (event, newValue) => setDistanceValue(newValue);

  // Rating
  const [ratingValue, setRatingValue] = useState(0);

  // Food types
  const [foodtypes, setFoodtypes] = useState(["veg", "non-veg"]);

  // Halal
  const [halal, setHalal] = useState(["yes", "no"]);

  // Cuisine
  const [cuisines, setCuisines] = useState([
    "chinese",
    "multi-cuisine",
    "middle-eastern",
    "north-indian",
    "south-indian",
  ]);

  // Restaurants
  const [restaurants, setRestaurants] = useState([
    {
      rid: "1",
      name: "Mamma's",
      cuisine: "Multi-cuisine",
      type: "Non-veg",
      halal: "no",
      rating: 4.5,
      price: 800,
      distance: 2.5,
      description:
        "An upscale casual restaurant providing a relaxed yet refined dining experience...",
    },
    {
      rid: "2",
      name: "MaxFun",
      cuisine: "Multi-cuisine",
      type: "Non-veg",
      halal: "no",
      rating: 4.2,
      price: 600,
      distance: 1.8,
      description: "A vibrant and lively casual dining spot, popular among youth...",
    },
    {
      rid: "3",
      name: "Dine Inn Kasa",
      cuisine: "Multi-cuisine",
      type: "Non-veg",
      halal: "no",
      rating: 4.0,
      price: 750,
      distance: 3.2,
      description:
        "An upscale casual restaurant providing a relaxed yet refined dining experience...",
    },
    {
      rid: "4",
      name: "Arabian Palace",
      cuisine: "Middle Eastern",
      type: "Non-veg",
      halal: "yes",
      rating: 4.8,
      price: 900,
      distance: 4.0,
      description:
        "An authentic Middle Eastern restaurant renowned for its grilled meats...",
    },
    {
      rid: "5",
      name: "Spice Garden",
      cuisine: "North Indian",
      type: "Veg",
      halal: "yes",
      rating: 4.6,
      price: 550,
      distance: 1.2,
      description: "Pure vegetarian North Indian cuisine with authentic flavors...",
    },
    {
      rid: "6",
      name: "Dragon Wok",
      cuisine: "Chinese",
      type: "Non-veg",
      halal: "no",
      rating: 4.3,
      price: 700,
      distance: 2.8,
      description: "Authentic Chinese cuisine with a modern twist...",
    },
  ]);

  /*useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/list");
        if (Array.isArray(response.data)) {
          /*setRestaurants(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);*/

  // Filtering & Sorting Logic
  const filteredRestaurants = restaurants
    .filter(
      (r) =>
        r.price >= priceValue[0] &&
        r.price <= priceValue[1] &&
        r.distance >= distanceValue[0] &&
        r.distance <= distanceValue[1] &&
        r.rating >= ratingValue &&
        foodtypes.includes(r.type.toLowerCase()) &&
        halal.includes(r.halal.toLowerCase()) &&
        cuisines.includes(r.cuisine.toLowerCase().replace(/\s+/g, "-"))
    )
    .sort((a, b) => {
      switch (filters) {
        case "price-hl":
          return b.price - a.price;
        case "price-lh":
          return a.price - b.price;
        case "distance":
          return a.distance - b.distance;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    console.log(filteredRestaurants);
    localStorage.setItem("restaurant_list",JSON.stringify(filteredRestaurants));

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8f9fa',
      py: 4 
    }}>
      <Box sx={{ 
        maxWidth: '1400px', 
        mx: 'auto', 
        px: 3,
        display: 'flex',
        gap: 3,
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Sidebar Filters */}
        <Paper 
          elevation={0}
          sx={{ 
            width: { xs: '100%', md: '320px' },
            flexShrink: 0,
            p: 3,
            height: 'fit-content',
            position: { md: 'sticky' },
            top: { md: 20 },
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Filters
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button 
                variant="contained" 
                size="small"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2
                }}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2
                }}
                onClick={() => {
                  setPriceValue([0, 1000]);
                  setDistanceValue([0, 100]);
                  setRatingValue(0);
                  setFoodtypes(["veg", "nonveg"]);
                  setHalal(["yes", "no"]);
                  setCuisines([
                    "chinese",
                    "multi-cuisine",
                    "middle-eastern",
                    "north-indian",
                    "south-indian",
                  ]);
                }}
              >
                Reset
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Price */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Price Range
            </Typography>
            <Slider
              value={priceValue}
              onChange={handlePriceValue}
              valueLabelDisplay="auto"
              max={1000}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                ₹{priceValue[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{priceValue[1]}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Distance */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Distance (km)
            </Typography>
            <Slider
              value={distanceValue}
              onChange={handleDistanceValue}
              valueLabelDisplay="auto"
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                {distanceValue[0]} km
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {distanceValue[1]} km
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Rating */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
              Minimum Rating
            </Typography>
            <Rating
              value={ratingValue}
              onChange={(event, newValue) => setRatingValue(newValue)}
              size="large"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Type */}
          <FilterToggleGroup
            title="Food Type"
            value={foodtypes}
            onChange={(event, newValue) => setFoodtypes(newValue)}
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
            onChange={(event, newValue) => setHalal(newValue)}
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
            onChange={(event, newValue) => setCuisines(newValue)}
            options={[
              { value: "chinese", label: "Chinese" },
              { value: "multi-cuisine", label: "Multi-cuisine" },
              { value: "middle-eastern", label: "Middle Eastern" },
              { value: "north-indian", label: "North Indian" },
              { value: "south-indian", label: "South Indian" },
            ]}
          />
        </Paper>

        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Sort By */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 2.5,
              mb: 3,
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Sort by:
            </Typography>
            <ToggleButtonGroup
              value={filters}
              exclusive
              onChange={handleFilters}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              <ToggleButton 
                value="price-hl"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: '8px !important',
                  px: 2.5
                }}
              >
                Price: High to Low
              </ToggleButton>
              <ToggleButton 
                value="price-lh"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: '8px !important',
                  px: 2.5
                }}
              >
                Price: Low to High
              </ToggleButton>
              <ToggleButton 
                value="distance"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: '8px !important',
                  px: 2.5
                }}
              >
                Distance
              </ToggleButton>
              <ToggleButton 
                value="rating"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: '8px !important',
                  px: 2.5
                }}
              >
                Rating
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>

          {/* Restaurant Cards - Vertical Stack */}
          <Stack spacing={2.5}>
            {filteredRestaurants.map((restaurant) => (
              <Card
                key={restaurant.rid}
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    borderColor: '#1976d2',
                  },
                }}
                onClick={() => navigate(`/restaurants/${restaurant.rid}`)}
              >
                {/* Restaurant Image */}
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', sm: 240 },
                    height: { xs: 200, sm: '100%' },
                    objectFit: 'cover',
                  }}
                  image={restaurant.image || restaurantimage}
                  alt={restaurant.name}
                />

                {/* Restaurant Details */}
                <CardContent sx={{ 
                  flex: 1, 
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    {/* Header */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2
                    }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 700,
                            mb: 0.5,
                            color: '#1a1a1a'
                          }}
                        >
                          {restaurant.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={restaurant.rating}
                            precision={0.1}
                            size="small"
                            readOnly
                          />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 600,
                              color: '#1976d2'
                            }}
                          >
                            {restaurant.rating}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {restaurant.description}
                    </Typography>

                    {/* Info Row */}
                    <Stack 
                      direction="row" 
                      spacing={3} 
                      sx={{ mb: 2 }}
                      flexWrap="wrap"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AttachMoney sx={{ fontSize: 18, color: '#4caf50' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          ₹{restaurant.price} for two
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 18, color: '#f44336' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {restaurant.distance} km away
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Tags */}
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                    <Chip
                      label={restaurant.cuisine}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 1.5, fontWeight: 500 }}
                    />
                    <Chip
                      label={restaurant.type}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ borderRadius: 1.5, fontWeight: 500 }}
                    />
                    {restaurant.halal === "yes" && (
                      <Chip
                        label="Halal"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ borderRadius: 1.5, fontWeight: 500 }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* No Results */}
          {filteredRestaurants.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 2,
                border: '1px solid #e0e0e0'
              }}
            >
              <RestaurantIcon sx={{ fontSize: 64, color: '#bdbdbd', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No restaurants found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your filters
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Restaurants;