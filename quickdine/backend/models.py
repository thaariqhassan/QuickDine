from sqlalchemy import Column, Integer, String, Boolean, Numeric
from database import Base
# schema creation for db
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String,nullable=False)


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, index=True) # Hotel Thaariq
    cuisine = Column(String, index=True) # Middle Eastern
    cuisine_type = Column(String, index=True) # Non veg
    description = Column(String, index=True) # Amazing food by award winning chef Thaariq
    address = Column(String, index=True) # Switzerland Street, Switzerland

    halal = Column(Boolean, index=True) # Yes

    price = Column(Integer, index=True) # 1000
    rating = Column(Numeric(2,1), index=True) # 10.0

    seats_total = Column(Integer, index=True) # 75
    seats_current = Column(Integer, index=True) # 74

    longitude = Column(Numeric(10,8), index=True) #38.897778
    latitude = Column(Numeric(10,8), index=True) #-77.036389

