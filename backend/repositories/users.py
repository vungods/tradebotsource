from sqlalchemy.orm import Session
from models.database_models import User 

def create_user(db: Session, username: str, password: str, role: str):
    db_user = User(username=username, password=password, role = role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

def update_user(db: Session, username: str, password: str, role: str):
    db_user = db.query(User).filter(User.username == username).first()
    if db_user:
        db_user.password = password
        db_user.role = role
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, username: str):
    db_user = db.query(User).filter(User.username == username).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return {"message": "User deleted successfully"}
