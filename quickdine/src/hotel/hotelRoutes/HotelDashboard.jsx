import React, {useState, useEffect} from "react";
import {
  Calendar,Clock,Users,Phone,
  Mail,CheckCircle,XCircle,List
} from "lucide-react";
import "../../routes/ordering/orderStyles/PlacingOrder.css";
function HotelDashboard(){
    
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

  const handleStatusChange = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  };

  const handleStatusConfirm = async (id, newStatus) => {
  try {
    // API call — confirm or update reservation
    await api.put(`/api/orders/${id}/confirm`);

    // Update UI state
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );

    console.log(`Reservation ${id} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating reservation:", error);
  }
};


  const [reservations, setReservations] = useState([]);
  const restaurantId = localStorage.getItem("user_id");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/api/restaurant/${restaurantId}/orders`);
        setReservations(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, [restaurantId]);

    return(
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
                          handleStatusConfirm(reservation.id, "confirmed")
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
        </div>
      </div>
    </div>
  );
}
export default HotelDashboard;