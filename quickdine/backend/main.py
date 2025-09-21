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
    return {"message": "Login successful"}


"""@app.get("/users/", response_model=schemas.UserResponse)
def get_users(user_email : str, user_pwd : str, db: Session = Depends(get_db)):
    activeUser =  db.query(models.User).filter(models.User.email == user_email & models.User.password == user_pwd).first()
    if activeUser:
        return activeUser
    else:
        raise HTTPException(status_code=404, detail="Invalid credentials")"""

# Restaurants
@app.get("/restaurants/", response_model=List[schemas.RestaurantsResponse])
def restaurants_list(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_restaurants = db.query(models.Restaurant).all()
    return db_restaurants
