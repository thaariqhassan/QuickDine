import React, { useState } from "react";
import {
  Calendar,Clock,Users,Phone,
  Mail,User,CheckCircle
} from "lucide-react";

import "../orderStyles/PlacingOrder.css";

function PlacingOrder(){
  const [reservations, setReservations] = useState([]);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "",
    time: "", guests: 2, specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      id: reservations.length + 1,
      ...formData,
      status: "pending",
    };
    setReservations((prev) => [...prev, newReservation]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        specialRequests: "",
      });
    }, 3000);
  };

  const CustomerInterface = () => (
    <div className="page customer-bg">
      <div className="form-container">
        <div className="card">
          <div className="text-center">
            <h1 className="title">Reserve Your Table</h1>
            <p className="subtitle">Book your dining experience with us</p>
          </div>

          {submitted ? (
            <div className="success-box">
              <CheckCircle className="success-icon" />
              <h3 className="success-title">Reservation Submitted!</h3>
              <p className="success-text">
                We'll confirm your booking shortly via email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reservation-form">
              <div>
                <label className="label">
                  <User size={16} className="label-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-row">
                <div>
                  <label className="label">
                    <Mail size={16} className="label-icon" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="label">
                    <Phone size={16} className="label-icon" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label className="label">
                    <Calendar size={16} className="label-icon" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">
                    <Clock size={16} className="label-icon" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <Users size={16} className="label-icon" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="input textarea"
                  placeholder="Any dietary restrictions, seating preferences..."
                />
              </div>

              <button type="submit" className="btn-submit">
                Reserve Table
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
  return <CustomerInterface />;
};

export default PlacingOrder;
