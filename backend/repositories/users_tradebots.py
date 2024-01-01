from sqlalchemy.orm import Session
from models.database_models import UserTradebot
import datetime
def create_user_tradebot(db: Session, user_id: int, tradebot_id: int, expiry_date: int):
    db_user_tradebot = UserTradebot(user_id=user_id, tradebot_id=tradebot_id, expiry_date=expiry_date)
    db.add(db_user_tradebot)
    db.commit()
    db.refresh(db_user_tradebot)
    return db_user_tradebot

def get_user_tradebot(db: Session, user_tradebot_id: int):
    return db.query(UserTradebot).filter(UserTradebot.id == user_tradebot_id).first()

def get_user_tradebots(db: Session, skip: int = 0, limit: int = 10):
    return db.query(UserTradebot).offset(skip).limit(limit).all()

def update_user_tradebot(db: Session, user_tradebot_id: int, expiry_date: datetime):
    db_user_tradebot = db.query(UserTradebot).filter(UserTradebot.id == user_tradebot_id).first()
    if db_user_tradebot:
        db_user_tradebot.expiry_date = expiry_date
        db.commit()
        db.refresh(db_user_tradebot)
    return db_user_tradebot

def delete_user_tradebot(db: Session, user_tradebot_id: int):
    db_user_tradebot = db.query(UserTradebot).filter(UserTradebot.id == user_tradebot_id).first()
    if db_user_tradebot:
        db.delete(db_user_tradebot)
        db.commit()
    return {"message": "UserTradebot deleted successfully"}
