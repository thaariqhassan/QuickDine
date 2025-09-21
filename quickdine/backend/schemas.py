from pydantic import BaseModel

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
    rating: int

    seats_total: int
    seats_current: int

    longitude: float
    latitude: float
