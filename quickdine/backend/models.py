from sqlalchemy import Column, Integer, String, Boolean, Numeric, ForeignKey, DateTime, Float, Date, Enum, Time
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone
import enum


class ReservationStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    is_restaurant = Column(Boolean, default=False)

    # Relationships
    reservations = relationship("Reservation", back_populates="user")
    orders = relationship("OrderHistory", back_populates="user")


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cuisine = Column(String, index=True)
    cuisine_type = Column(String, index=True)
    description = Column(String, index=True)
    address = Column(String, index=True)
    halal = Column(Boolean, index=True)
    price = Column(Integer, index=True)
    rating = Column(Numeric(2, 1), index=True)
    total_seats = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)
    longitude = Column(Numeric(10, 8), index=True)
    latitude = Column(Numeric(10, 8), index=True)
    image = Column(String, index=True)
    address = Column(String, index=True)

    # Owner (optional)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    owner = relationship("User")

    # Relationships
    reservations = relationship("Reservation", back_populates="restaurant")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    seats_reserved = Column(Integer)
    schedule_date = Column(Date)
    schedule_time = Column(String)
    status = Column(Enum(ReservationStatus), default=ReservationStatus.pending)

    user = relationship("User", back_populates="reservations")
    restaurant = relationship("Restaurant", back_populates="reservations")


class OrderHistory(Base):
    __tablename__ = "order_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    placed_at = Column(DateTime, default=datetime.now(timezone.utc))

    user = relationship("User", back_populates="orders")
