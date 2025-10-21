import React, { useState } from "react";
import { Star, ShoppingCart, MapPin } from "lucide-react";
import "../orderStyles/RestaurantView.css";
import { useNavigate,useSearchParams, useParams } from "react-router";

// Dummy comments
const comments = [
  { cid: 1, username: "Thaariq", rating: 3.0, comment: "Too expensive..." },
  { cid: 2, username: "Abhay", rating: 4.0, comment: "Good restaurant..." },
  { cid: 3, username: "Yohaan", rating: 4.0, comment: "Good" },
  { cid: 4, username: "Ajay", rating: 1.0, comment: "Scam" },
  { cid: 5, username: "John Cena", rating: 4.0, comment: "Bing chilling ice cream is available" },
  { cid: 6, username: "Gordon Ramsay", rating: 1.0, comment: "The chicken was raw" },
];

const avatarColors = [
  "#F44336", "#E91E63", "#9C27B0", "#673AB7",
  "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4",
  "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
  "#FFEB3B", "#FFC107", "#FF9800", "#FF5722",
  "#795548", "#9E9E9E", "#607D8B"
];

function getAvatarColor(index) {
  return avatarColors[index % avatarColors.length];
}

function RestaurantView() {
  const {id} = useParams();
  const restaurants = JSON.parse(localStorage.getItem("restaurant_list"));
  console.log(restaurants);
  console.log(id);
  const selected_restaurant = restaurants.find(r =>
    r.rid === id
  );
  console.log(selected_restaurant)
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const restaurantimage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop";

  return (
    <div className="restaurant-body">
      <div className="restaurant-container">
        
        {/* Main Section */}
        <div className="restaurant-main">
          
          {/* Image */}
          <div className="restaurant-image-section">
            <img src={restaurantimage} alt="Restaurant" className="restaurant-image" />
          </div>

          {/* Info */}
          <div className="restaurant-info">
            <h1 className="restaurant-title">{selected_restaurant.name}</h1>
            <p className="restaurant-desc">
              Description of the restaurant goes here. Enjoy authentic cuisine in a cozy atmosphere with exceptional service.
            </p>

            <div className="restaurant-tags">
              <span className="tag blue">{selected_restaurant.cusine}</span>
              <span className="tag blue">Fine Dining</span>
              <span className="tag green">{selected_restaurant.halal =='yes' ? "HALAL":"Not-halal"}</span>
            </div>

            <div className="restaurant-price">
              <p className="price-range">₹ 500 - 1000</p>
              <p className="price-note">Price for two people</p>
            </div>

            <div className="restaurant-rating">
              <Star className="star-icon" size={28} />
              <span className="rating-value">{selected_restaurant.rating}</span>
              <span className="rating-count">({comments.length} reviews)</span>
            </div>

            <div className="restaurant-buttons">
              <button className="btn order-btn" onClick={() =>{navigate(`/restaurants/${id}/placingOrder`)}}>
                <ShoppingCart size={20} />
                Order
              </button>
              <button className="btn location-btn">
                <MapPin size={20} />
                Location
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2 className="reviews-title">Customer Reviews</h2>
          <div className="reviews-grid">
            {comments.map((comment, index) => (
              <div key={comment.cid} className="review-card">
                <div className="review-content">
                  <div className="review-header">
                    <div
                      className="review-avatar"
                      style={{ backgroundColor: getAvatarColor(index) }}
                    >
                      {comment.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="review-username">{comment.username}</p>
                      <div className="review-rating">
                        <Star className="star-small" size={16} />
                        <span className="rating-text">{comment.rating.toFixed(1)}/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="review-text">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RestaurantView;
