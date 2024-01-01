from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories import models
from database.database import SessionLocal 
from repositories import tradebots

router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tradebots/")
def create_tradebot(name: str, description: str, model_id: int, ticket_id: int,db: Session = Depends(get_db)):
    return tradebots.create_tradebot(db, name=name, description=description, model_id=model_id, ticket_id=ticket_id)

@router.get("/tradebots/{tradebot_id}")
def read_tradebot(tradebot_id: int, db: Session = Depends(get_db)):
    tradebot = tradebots.get_tradebot(db, tradebot_id=tradebot_id)
    if tradebot is None:
        raise HTTPException(status_code=404, detail="Tradebot not found")
    return tradebot

@router.get("/tradebots/")
def read_tradebots(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tradebots_list = tradebots.get_tradebots(db, skip=skip, limit=limit)
    return tradebots_list


@router.get("/tradebots_user/{user_id}")
def read_tradebots(user_id: int, db: Session = Depends(get_db)):
    print("Xin chào")
    tradebot = tradebots.get_tradebots_by_user_id(db, user_id)
    if not tradebot:
        raise HTTPException(status_code=404, detail="No tradebots found for this user")

    # Assuming format_tradebots is a function you've defined to format the data
    return tradebot

@router.put("/tradebots/{tradebot_id}")
def update_tradebot(tradebot_id: int, name: str, description: str, db: Session = Depends(get_db)):
    return tradebots.update_tradebot(db, tradebot_id=tradebot_id, name=name, description=description)

@router.delete("/tradebots/{tradebot_id}")
def delete_tradebot(tradebot_id: int, db: Session = Depends(get_db)):
    return tradebots.delete_tradebot(db, tradebot_id=tradebot_id)



@router.get("/tradebot/details/{tradebot_id}")
def read_tradebot_details(tradebot_id: int, db: Session = Depends(get_db)):
    tradebot_details = tradebots.get_tradebot_details(db, tradebot_id)
    if not tradebot_details:
        raise HTTPException(status_code=404, detail="Tradebot details not found")

    return tradebot_details