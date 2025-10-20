from pydantic import BaseModel
from datetime import date, datetime
from enum import Enum


# ========================
# ENUMS
# ========================
class ReservationStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


# ========================
# USER SCHEMAS
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
# RESTAURANT SCHEMAS
# ========================
class RestaurantBase(BaseModel):
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


class RestaurantsResponse(RestaurantBase):
    id: int

    class Config:
        orm_mode = True


# ========================
# RESERVATION SCHEMAS
# ========================
class ReservationBase(BaseModel):
    user_id: int
    restaurant_id: int
    seats_reserved: int


class ReservationCreate(ReservationBase):
    pass


class ReservationResponse(ReservationBase):
    id: int
    date: date
    status: ReservationStatus

    class Config:
        orm_mode = True


# ========================
# ORDER HISTORY SCHEMAS
# ========================
class OrderHistoryBase(BaseModel):
    item_name: str
    quantity: int
    price: float


class OrderHistoryResponse(OrderHistoryBase):
    id: int
    user_id: int
    placed_at: datetime

    class Config:
        orm_mode = True
