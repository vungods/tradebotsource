from sqlalchemy.orm import Session
from models.database_models import Model

def create_model(db: Session, name: str, description: str, policy_type: str):
    db_model = Model(name=name, description=description, policy_type=policy_type)
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model

def get_model(db: Session, model_id: int):
    return db.query(Model).filter(Model.id == model_id).first()

def get_models(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Model).offset(skip).limit(limit).all()

def update_model(db: Session, model_id: int, name: str, description: str, policy_type: str):
    db_model = db.query(Model).filter(Model.id == model_id).first()
    if db_model:
        db_model.name = name
        db_model.description = description
        db_model.policy_type = policy_type
        db.commit()
        db.refresh(db_model)
    return db_model

def delete_model(db: Session, model_id: int):
    db_model = db.query(Model).filter(Model.id == model_id).first()
    if db_model:
        db.delete(db_model)
        db.commit()
    return {"message": "Model deleted successfully"}


