from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models as models, schemas as schemas
from database import Base, engine, SessionLocal

from auth import hash_password, verify_password

from typing import List

# Create tables in SQLite
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
        ],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency: get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Restaurants init
def restaurants_initialize():
    db = SessionLocal()

    restaurants_file = open("restaurants.tsv")
    restaurants_lines = restaurants_file.readlines()

    db.query(models.Restaurant).delete()

    for restaurants_line in restaurants_lines:
        restaurant = restaurants_line.split("\t")
        restaurant_query = models.Restaurant(
                id = int(restaurant[0]),
                name = str(restaurant[1]),
                cuisine = str(restaurant[2]),
                cuisine_type = str(restaurant[3]),
                description = str(restaurant[4]),
                address = str(restaurant[5]),
                halal = restaurant[6]=="yes",
                price = int(restaurant[7]),
                rating = float(restaurant[8]),
                seats_total = int(restaurant[9]),
                seats_current = int(restaurant[10]),
                longitude = float(restaurant[11]),
                latitude = float(restaurant[12])
            )
        db.add(restaurant_query)
        db.commit()
        db.refresh(restaurant_query)
    db.close()

# ✅ Add new user
@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pwd = hash_password(user.password)
    db_user = models.User(name=user.name, email=user.email,password=hashed_pwd)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Check if user exists
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful",
            "user_id": db_user.id,
            "user_name" : db_user.name,
            "user_email" : db_user.email
            }


"""@app.get("/users/", response_model=schemas.UserResponse)
def get_users(user_email : str, user_pwd : str, db: Session = Depends(get_db)):
    activeUser =  db.query(models.User).filter(models.User.email == user_email & models.User.password == user_pwd).first()
    if activeUser:
        return activeUser
    else:
        raise HTTPException(status_code=404, detail="Invalid credentials")"""

# Restaurants
@app.get("/restaurants/init")
def restaurants_init(db: Session = Depends(get_db)):
    try:
        restaurants_initialize()
        return {"message": "Initializing restaurant database successful"}
    except Exception as e:
        return {"message": "Initializing restaurant database fail", "error": str(e)}

@app.get("/restaurants/list", response_model=List[schemas.RestaurantsResponse])
def restaurants_list(db: Session = Depends(get_db)):
    db_restaurants = db.query(models.Restaurant).all()
    return db_restaurants

# Create new order
@app.post("/orders", response_model=schemas.OrderResponse)
def create_order(order: schemas.OrderCreate, user_id: int, db: Session = Depends(get_db)):
    new_order = models.OrderHistory(user_id=user_id, **order.model_dump())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

# Get all orders for a user
@app.get("/orders/{user_id}", response_model=list[schemas.OrderResponse])
def get_orders(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.OrderHistory).filter(models.OrderHistory.user_id == user_id).all()
