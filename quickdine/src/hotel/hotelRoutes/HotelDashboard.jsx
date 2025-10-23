import React, {useState, useEffect} from "react";
import {
  Calendar,Clock,Users,Phone,
  Mail,CheckCircle,XCircle,List
} from "lucide-react";
import api from "../../api/axios";
import "./HotelDashboard.css";
function HotelDashboard(){
    const [clicked,setClicked] = useState(false);
    
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

  const handleStatusConfirm = async (id, newStatus) => {
    if (newStatus == "confirmed"){
      try{
        await api.put(`http://127.0.0.1:8000/api/orders/${id}/confirm`);
        console.log("order confirmed");
        setClicked(!clicked);
      }catch (error) {
      console.error("Error updating reservation:", error);
      }
    }
  };

  const handleStatusReject = async (id, newStatus) => {
    if (newStatus == "rejected"){
      try{
        await api.put(`http://127.0.0.1:8000/api/orders/${id}/reject`);
        console.log("order rejected");
        setClicked(!clicked);
      }catch (error) {
      console.error("Error updating reservation:", error);
      }
    }
  };



  //const restaurantId = localStorage.getItem("restaurant_id");
  const restaurantId = 1;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          `http://127.0.0.1:8000/api/restaurant/${restaurantId}/orders`
        );
        setOrders(response.data);
      } catch (err) {
        console.log( "Something went wrong");
        console.log(err);
      }
    };

    fetchOrders();
  }, [clicked]);

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
              <span>{orders.length} Reservations</span>
            </div>
          </div>

          <div className="reservation-list">
            
            {orders.length === 0 ? (
              <div className="empty-state">
                <List size={48} className="empty-icon" />
                <p>No reservations yet</p>
              </div>
            ) : (
              orders.map((reservation) => (
                <div key={reservation.id} className="reservation-card">
                  <div className="reservation-info">
                    <div className="reservation-name">
                      <h3>{reservation.user?.name}</h3>
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
                        <Mail size={14} /> {reservation.user?.email}
                      </p>
                      <p>
                        <Phone size={14} /> 98654525865
                      </p>
                      <p>
                        <Calendar size={14} />{" "}
                        {new Date(reservation.schedule_date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <Clock size={14} /> {reservation.schedule_time}
                      </p>
                      <p>
                        <Users size={14} /> {reservation.seats_reserved} Guests
                      </p>
                    </div>
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
                          handleStatusReject(reservation.id, "rejected")
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