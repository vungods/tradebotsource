# models.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories import models
from database.database import SessionLocal 
from repositories import models
router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/models/")
def create_model(name: str, description: str, policy_type: str, db: Session = Depends(get_db)):
    return models.create_model(db, name=name, description=description, policy_type=policy_type)

@router.get("/models/{model_id}")
def read_model(model_id: int, db: Session = Depends(get_db)):
    return models.get_model(db, model_id=model_id)

@router.get("/models/")
def read_models(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return models.get_models(db, skip=skip, limit=limit)

@router.put("/models/{model_id}")
def update_model(model_id: int, name: str, description: str, policy_type: str, db: Session = Depends(get_db)):
    return models.update_model(db, model_id=model_id, name=name, description=description, policy_type=policy_type)

@router.delete("/models/{model_id}")
def delete_model(model_id: int, db: Session = Depends(get_db)):
    return models.delete_model(db, model_id=model_id)
