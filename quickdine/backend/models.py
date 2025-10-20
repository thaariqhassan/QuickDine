from sqlalchemy import Column, Integer, String, Boolean, Numeric, ForeignKey, DateTime, Float, Date, Enum
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone
import enum


# ========================
# ENUMS
# ========================
class ReservationStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


# ========================
# USER MODEL
# ========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    is_restaurant = Column(Boolean, default=False)

    # Relationships
    reservations = relationship("Reservation", back_populates="user")
    orders = relationship("OrderHistory", back_populates="user")
    owned_restaurants = relationship("Restaurant", back_populates="owner")


# ========================
# RESTAURANT MODEL
# ========================
class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    cuisine = Column(String)
    cuisine_type = Column(String)
    description = Column(String)
    address = Column(String)
    halal = Column(Boolean, default=False)
    price = Column(Integer)
    rating = Column(Numeric(2, 1))
    total_seats = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)
    longitude = Column(Numeric(10, 8))
    latitude = Column(Numeric(10, 8))

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="owned_restaurants")

    # Relationships
    reservations = relationship("Reservation", back_populates="restaurant")


# ========================
# RESERVATION MODEL
# ========================
class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    seats_reserved = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    status = Column(Enum(ReservationStatus), default=ReservationStatus.pending)

    # Relationships
    user = relationship("User", back_populates="reservations")
    restaurant = relationship("Restaurant", back_populates="reservations")


# ========================
# ORDER HISTORY MODEL
# ========================
class OrderHistory(Base):
    __tablename__ = "order_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    placed_at = Column(DateTime, default=datetime.now(timezone.utc))

    user = relationship("User", back_populates="orders")
