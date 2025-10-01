from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password : str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    password : str

    class Config:
        orm_mode = True

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

    seats_total: int
    seats_current: int

    longitude: float
    latitude: float


# For creating an order
class OrderCreate(BaseModel):
    item_name: str
    quantity: int
    price: float

# For returning order data
class OrderResponse(BaseModel):
    id: int
    user_id: int
    item_name: str
    quantity: int
    price: float
    placed_at: datetime

    class Config:
        orm_mode = True