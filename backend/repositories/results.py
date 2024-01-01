from sqlalchemy.orm import Session
from models.database_models import Result

def create_result(db: Session, tradebot_id: int, timestamp: int, profit: float, buy_traded: int,sell_traded: int, img_base64: str):
    db_result = Result(
        tradebot_id=tradebot_id, 
        timestamp=timestamp, 
        profit=profit, 
        sell_traded=sell_traded, 
        buy_traded=buy_traded, 
        img_base64=img_base64
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_result(db: Session, result_id: int):
    return db.query(Result).filter(Result.id == result_id).first()

def get_results(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Result).offset(skip).limit(limit).all()

def update_result(db: Session, result_id: int, tradebot_id: int, timestamp: int, profit: float, buy_traded: int,sell_traded: int, img_base64: str):
    db_result = db.query(Result).filter(Result.id == result_id).first()
    if db_result:
        db_result.tradebot_id = tradebot_id
        db_result.timestamp = timestamp
        db_result.profit = profit
        db_result.buy_traded = buy_traded
        db_result.sell_traded = sell_traded
        db_result.img_base64 = img_base64
    return db_result

def delete_result(db: Session, result_id: int):
    db_result = db.query(Result).filter(Result.id == result_id).first()
    if db_result:
        db.delete(db_result)
        db.commit()
        return {"message": "Result deleted successfully"}
    return {"message": "Result not found"}
