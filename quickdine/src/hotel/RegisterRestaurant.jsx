import React, { useState } from 'react';
import { MapPin, Utensils, DollarSign, Star, Users, ImageIcon } from 'lucide-react';
import "./RegisterRestaurant.css"
import api from '../api/axios';

export default function RegisterRestaurant() {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    cuisine_type: '',
    description: '',
    address: '',
    halal: false,
    price: '',
    rating: '',
    total_seats: '',
    available_seats: '',
    longitude: '',
    latitude: '',
    image: ''
  });

  const [formData2, setFormData2] = useState({
    name:'',
    email:'',
    password:'',
    is_restaurant : true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData2(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Restaurant details submitted! Check console for data.');
    formData2.name = formData.name;
    formData2.is_restaurant = true;


    const handleAddRestaurant = async (formData) => {
  try {
    const response = await api.post("/restaurants/add", formData);
    console.log("✅ Restaurant added:", response.data.restaurant);
    const response2 = await api.post("/users/", formData2);
    console.log("✅ Signup success:", response2.data);
  } catch (error) {
    console.error("❌ Error adding restaurant:", error.response?.data || error.message);
  }
};
handleAddRestaurant(formData);

  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <div className="form-card">
          {/* Header */}
          <div className="form-header">
            <div className="header-title">
              <Utensils className="header-icon" />
              <h1>Restaurant Details</h1>
            </div>
            <p className="header-subtitle">Add your restaurant information</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="form-content">
            {/* Basic Information */}
            <div className="form-section">
              <h2 className="section-title">
                <Utensils className="section-icon" />
                Basic Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter restaurant name"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Restaurant Email *
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData2.email}
                    onChange={handleChange2}
                    required
                    className="form-input"
                    placeholder="Enter Restaurant Email"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Restaurant Password*
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData2.password}
                    onChange={handleChange2}
                    required
                    className="form-input"
                    placeholder="Enter Restaurant Password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Cuisine
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Italian, Chinese"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    name="cuisine_type"
                    value={formData.cuisine_type}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Fine Dining, Fast Food"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="form-input form-textarea"
                    placeholder="Describe your restaurant..."
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Full address"
                  />
                </div>
              </div>
            </div>

            {/* Details & Ratings */}
            <div className="form-section">
              <h2 className="section-title">
                <Star className="section-icon" />
                Details & Ratings
              </h2>
              
              <div className="form-grid">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="halal"
                    id="halal"
                    checked={formData.halal}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="halal" className="checkbox-label">
                    Halal Certified
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label label-with-icon">
                    <DollarSign className="label-icon" />
                    Price Level (1-5)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    className="form-input"
                    placeholder="1-5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label label-with-icon">
                    <Star className="label-icon" />
                    Rating (0.0-5.0)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="5"
                    className="form-input"
                    placeholder="4.5"
                  />
                </div>
              </div>
            </div>

            {/* Seating Capacity */}
            <div className="form-section">
              <h2 className="section-title">
                <Users className="section-icon" />
                Seating Capacity
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Total Seats *
                  </label>
                  <input
                    type="number"
                    name="total_seats"
                    value={formData.total_seats}
                    onChange={handleChange}
                    required
                    min="0"
                    className="form-input"
                    placeholder="100"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Available Seats *
                  </label>
                  <input
                    type="number"
                    name="available_seats"
                    value={formData.available_seats}
                    onChange={handleChange}
                    required
                    min="0"
                    className="form-input"
                    placeholder="80"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="form-section">
              <h2 className="section-title">
                <MapPin className="section-icon" />
                Location Coordinates
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    step="0.00000001"
                    className="form-input"
                    placeholder="76.2673041"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    step="0.00000001"
                    className="form-input"
                    placeholder="9.9312328"
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="form-section">
              <h2 className="section-title">
                <ImageIcon className="section-icon" />
                Image
              </h2>
              
              <div className="form-group">
                <label className="form-label">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-section">
              <button type="submit" className="submit-button">
                Submit Restaurant Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
