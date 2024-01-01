from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from repositories import predictions as predictions_repository
from database.database import SessionLocal
from typing import List
from pydantic import BaseModel, parse_obj_as, ValidationError
import json
router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/predictions/")
def create_prediction(tradebot_id: int, predict_time: int, predict_action: int, predict_price: float, db: Session = Depends(get_db)):
    return predictions_repository.create_prediction(db=db, tradebot_id=tradebot_id, predict_time=predict_time, predict_action=predict_action, predict_price=predict_price)

@router.get("/predictions/{prediction_id}")
def read_prediction(prediction_id: int, db: Session = Depends(get_db)):
    db_prediction = predictions_repository.get_prediction(db, prediction_id=prediction_id)
    if db_prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return db_prediction

@router.get("/predictions/")
def read_predictions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return predictions_repository.get_predictions(db, skip=skip, limit=limit)

@router.put("/predictions/{prediction_id}")
def update_prediction(prediction_id: int, tradebot_id: int, predict_time: int, predict_action: int, predict_price: float, db: Session = Depends(get_db)):
    return predictions_repository.update_prediction(db, prediction_id=prediction_id, tradebot_id=tradebot_id, predict_time=predict_time, predict_action=predict_action, predict_price=predict_price)

@router.delete("/predictions/{prediction_id}")
def delete_prediction(prediction_id: int, db: Session = Depends(get_db)):
    return predictions_repository.delete_prediction(db, prediction_id=prediction_id)


class PredictionData(BaseModel):
    Date: str
    Open: float
    High: float
    Low: float
    Close: float
    Volume: int
    EMA: float
    RSI: float
    Turbulence: float


@router.post("/predictions_values")
def receive_values(payload: str = Body(...)):
    try:
        predictions = json.loads(payload)
        print("Parsed JSON:", predictions)
        return {"message": "JSON parsed and received successfully"}
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))