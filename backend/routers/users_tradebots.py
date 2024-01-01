from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories import users_tradebots
from database.database import SessionLocal
from typing import List
import datetime

router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users_tradebots/")
def create_user_tradebot(user_id: int, tradebot_id: int, expiry_date: datetime.datetime, db: Session = Depends(get_db)):
    return users_tradebots.create_user_tradebot(db=db, user_id=user_id, tradebot_id=tradebot_id, expiry_date=expiry_date)

@router.get("/users_tradebots/{user_tradebot_id}")
def read_user_tradebot(user_tradebot_id: int, db: Session = Depends(get_db)):
    db_user_tradebot = users_tradebots.get_user_tradebot(db, user_tradebot_id=user_tradebot_id)
    if db_user_tradebot is None:
        raise HTTPException(status_code=404, detail="UserTradebot not found")
    return db_user_tradebot

@router.get("/users_tradebots/")
def read_users_tradebots(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return users_tradebots.get_user_tradebots(db, skip=skip, limit=limit)

@router.put("/users_tradebots/{user_tradebot_id}")
def update_user_tradebot(user_tradebot_id: int, user_id: int, tradebot_id: int, expiry_date: datetime.datetime, db: Session = Depends(get_db)):
    return users_tradebots.update_user_tradebot(db, user_tradebot_id=user_tradebot_id, user_id=user_id, tradebot_id=tradebot_id, expiry_date=expiry_date)

@router.delete("/users_tradebots/{user_tradebot_id}")
def delete_user_tradebot(user_tradebot_id: int, db: Session = Depends(get_db)):
    return users_tradebots.delete_user_tradebot(db, user_tradebot_id=user_tradebot_id)
