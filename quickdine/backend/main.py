from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from models import ReservationStatus, Reservation
import models, schemas
from database import Base, engine, SessionLocal
from datetime import date
from auth import hash_password, verify_password
from typing import List

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Create user
@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pwd = hash_password(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_pwd,
        is_restaurant=user.is_restaurant
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# ✅ Login
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "user_name": db_user.name,
        "user_email": db_user.email,
        "is_restaurant": db_user.is_restaurant
    }


# ✅ Restaurant endpoints
@app.get("/restaurants/list", response_model=List[schemas.RestaurantsResponse])
def restaurants_list(db: Session = Depends(get_db)):
    return db.query(models.Restaurant).all()


# ✅ Reservation: create
@app.post("/api/reserve")
def create_reservation(user_id: int, restaurant_id: int, seats_reserved: int, db: Session = Depends(get_db)):
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    new_res = models.Reservation(
        user_id=user_id,
        restaurant_id=restaurant_id,
        seats_reserved=seats_reserved,
        date=date.today(),
        status=ReservationStatus.pending
    )
    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    return {"message": "Reservation created", "reservation_id": new_res.id}


# ✅ Get restaurant’s orders
@app.get("/api/restaurant/{restaurant_id}/orders", response_model=List[schemas.ReservationResponse])
def get_restaurant_orders(restaurant_id: int, db: Session = Depends(get_db)):
    return db.query(models.Reservation).filter(models.Reservation.restaurant_id == restaurant_id).all()


# ✅ Confirm order
@app.put("/api/orders/{order_id}/confirm")
def confirm_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Reservation).filter(models.Reservation.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == order.restaurant_id).first()
    if restaurant.available_seats < order.seats_reserved:
        raise HTTPException(status_code=400, detail="Not enough seats available")

    order.status = ReservationStatus.confirmed
    restaurant.available_seats -= order.seats_reserved
    db.commit()
    return {"message": "Order confirmed and seats updated"}


# ✅ User’s past orders
@app.get("/api/user/{user_id}/orders", response_model=List[schemas.ReservationResponse])
def get_user_orders(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Reservation).filter(models.Reservation.user_id == user_id).all()
