from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from database.database import SessionLocal 
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from typing import List
from repositories import users
app = FastAPI()
from sqlalchemy.orm import Session
from config.config import SECRET_KEY, ALGORITHM

router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Function to create a JWT token
def create_jwt_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# Function to get the current user based on the JWT token
def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="logintoken")), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = users.get_user(db, username=username)
    if user is None:
        raise credentials_exception
    return payload

# Route to get a JWT token
@router.post("/auth/login")
def login_for_access_token(user_data: dict, db: Session = Depends(get_db)):
    username = user_data.get("username")
    password = user_data.get("password")

    user = users.get_user(db, username=username)
    print(user.password)
    if user is None or user.password != password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # Create a JWT token with the username and role as the subject ("sub")
    token_data = {"sub": username, "role": user.role}
    access_token = create_jwt_token(token_data)
    return {"user": username,"role" : user.role, "access_token": access_token, "token_type": "bearer"}

@router.post("/logintoken_value")
def test_send(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user = users.get_user(db, username="nam")
    
    print(user.password)
    return current_user.get('role')


