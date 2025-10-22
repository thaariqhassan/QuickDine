from pydantic import BaseModel
from datetime import date, datetime, time
from enum import Enum
from typing import Optional


# ========================
# ENUMS
# ========================
class ReservationStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


# ========================
# USERS
# ========================
class UserBase(BaseModel):
    name: str
    email: str


class UserCreate(UserBase):
    password: str
    is_restaurant: bool = False


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(UserBase):
    id: int
    is_restaurant: bool

    class Config:
        orm_mode = True


# ========================
# RESTAURANTS
# ========================

class RestaurantCreate(BaseModel):
    name: str
    cuisine: str
    cuisine_type: str
    description: str
    address: str
    image:str
    halal: bool
    price: int
    rating: float
    seats_total: int
    seats_current: int
    longitude: float
    latitude: float

class RestaurantsResponse(BaseModel):
    id: int
    name: str
    cuisine: str
    cuisine_type: str
    description: str
    address: str
    halal: bool
    price: int
    rating: float
    total_seats: int
    available_seats: int
    longitude: float
    latitude: float

    class Config:
        orm_mode = True


# ========================
# RESERVATIONS
# ========================
class ReservationBase(BaseModel):
    user_id: int
    restaurant_id: int
    seats_reserved: int

class UserBase(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True

class ReservationCreate(BaseModel):
    user_id: int
    restaurant_id: int
    seats_reserved: int
    schedule_date: date
    schedule_time: str


class ReservationResponse(ReservationBase):
    id: int
    user_id: int
    restaurant_id: int
    seats_reserved: int
    schedule_date: date
    schedule_time: str
    status: ReservationStatus
    user: Optional[UserBase]

    class Config:
        orm_mode = True


# ========================
# ORDER HISTORY
# ========================
class OrderHistoryResponse(BaseModel):
    id: int
    item_name: str
    quantity: int
    price: float
    placed_at: datetime

    class Config:
        orm_mode = True
