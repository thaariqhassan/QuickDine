import { useState } from 'react';
import "../orderStyles/PlacingOrder.css"
import api from "../../../api/axios"

export default function PlacingOrder({restaurant_id}) {

  const [formData, setFormData] = useState({
    seats: 1,
    time: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Reservation Details:\nSeats: ${formData.seats}\nDate: ${formData.date}\nTime: ${formData.time}`);

    const form2 = {
      user_id : localStorage.getItem("user_id"),
      restaurant_id : restaurant_id,
      seats_reserved : formData.seats,
      schedule_date : formData.date,
      schedule_time : formData.time
    }
    const { userId, restaurantId, guests, date, time } = form2;

    await handleReserve(
  1,                      // hardcoded user ID
  1,                      // hardcoded restaurant ID  
  2,                      // hardcoded seats
  "2024-01-15",           // hardcoded date
  "18:30"                 // hardcoded time
  );
    //await handleReserve(userId, restaurantId, guests, date, time);

  }

  const handleReserve = async (userId, restaurantId, seatsReserved, scheduleDate, scheduleTime) => {
  try {

    const response = await api.post("http://127.0.0.1:8000/api/reserve", {
      user_id: userId,
      restaurant_id: restaurantId,
      seats_reserved: seatsReserved,
      schedule_date: scheduleDate,
      schedule_time: scheduleTime
    });

    console.log("✅ Reservation successful:", response.data);
    alert(response.data.message);
  } catch (error) {
    console.error("❌ Reservation failed:", error);
    alert("Failed to create reservation");
  }
};

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">Make a Reservation</h1>
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="seats">Number of Seats</label>
            <input
              type="number"
              id="seats"
              name="seats"
              min="1"
              max="20"
              value={formData.seats}
              onChange={handleChange}
              required
              placeholder="Enter number of seats"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Reserve Now
          </button>
        </form>
      </div>
    </div>
  );
}
