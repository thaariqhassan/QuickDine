import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  User,
  CheckCircle,
  XCircle,
  List,
} from "lucide-react";
import "../orderStyles/PlacingOrder.css";

const PlacingOrder = () => {
  const [view, setView] = useState("customer");
  const [reservations, setReservations] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      date: "2025-10-25",
      time: "19:00",
      guests: 4,
      specialRequests: "Window seat preferred",
      status: "pending",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
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

  const handleStatusChange = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  // Customer Interface
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

          <div className="text-center switch-view">
            <button onClick={() => setView("hotel")} className="link">
              Hotel Staff? Switch to Admin View
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Hotel Interface
  const HotelInterface = () => (
    <div className="page hotel-bg">
      <div className="hotel-container">
        <div className="card">
          <div className="hotel-header">
            <div>
              <h1 className="title">Reservation Management</h1>
              <p className="subtitle">Manage incoming table reservations</p>
            </div>
            <div className="reservation-count">
              <List size={20} />
              <span>{reservations.length} Reservations</span>
            </div>
          </div>

          <div className="reservation-list">
            {reservations.length === 0 ? (
              <div className="empty-state">
                <List size={48} className="empty-icon" />
                <p>No reservations yet</p>
              </div>
            ) : (
              reservations.map((reservation) => (
                <div key={reservation.id} className="reservation-card">
                  <div className="reservation-info">
                    <div className="reservation-name">
                      <h3>{reservation.name}</h3>
                      <span
                        className={`status ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {reservation.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="reservation-details">
                      <p>
                        <Mail size={14} /> {reservation.email}
                      </p>
                      <p>
                        <Phone size={14} /> {reservation.phone}
                      </p>
                      <p>
                        <Calendar size={14} />{" "}
                        {new Date(reservation.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <Clock size={14} /> {reservation.time}
                      </p>
                      <p>
                        <Users size={14} /> {reservation.guests} Guests
                      </p>
                    </div>

                    {reservation.specialRequests && (
                      <div className="special-requests">
                        <strong>Special Requests:</strong>{" "}
                        {reservation.specialRequests}
                      </div>
                    )}
                  </div>

                  {reservation.status === "pending" && (
                    <div className="reservation-actions">
                      <button
                        className="btn-confirm"
                        onClick={() =>
                          handleStatusChange(reservation.id, "confirmed")
                        }
                      >
                        <CheckCircle size={16} /> Confirm
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() =>
                          handleStatusChange(reservation.id, "rejected")
                        }
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="text-center switch-view">
            <button onClick={() => setView("customer")} className="link">
              Switch to Customer View
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return view === "customer" ? <CustomerInterface /> : <HotelInterface />;
};

export default PlacingOrder;
