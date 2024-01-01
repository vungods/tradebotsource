from sqlalchemy.orm import Session
from models.database_models import Prediction

def create_prediction(db: Session, tradebot_id: int, predict_time: int, predict_action: int, predict_price: float):
    db_prediction = Prediction(tradebot_id=tradebot_id, predict_time=predict_time, predict_action=predict_action, predict_price=predict_price)
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    return db_prediction

def get_prediction(db: Session, prediction_id: int):
    return db.query(Prediction).filter(Prediction.id == prediction_id).first()

def get_predictions(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Prediction).offset(skip).limit(limit).all()

def update_prediction(db: Session, prediction_id: int, tradebot_id: int, predict_time: int, predict_action: int, predict_price: float):
    db_prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
    if db_prediction:
        db_prediction.tradebot_id = tradebot_id
        db_prediction.predict_time = predict_time
        db_prediction.predict_action = predict_action
        db_prediction.predict_price = predict_price
        db.commit()
        db.refresh(db_prediction)
    return db_prediction

def delete_prediction(db: Session, prediction_id: int):
    db_prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
    if db_prediction:
        db.delete(db_prediction)
        db.commit()
        return {"message": "Prediction deleted successfully"}
    return {"message": "Prediction not found"}
