# main.py
from fastapi import FastAPI
from databases import Database
from models.database_models import Base
from config.config import DATABASE_URL, origins
from routers import models, tradebots, user_login, users_tradebots, results, predictions
from model_predict import model_predict
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware



app =  FastAPI()

# Define the prefix
common_prefix = "/api"

routers = [
    ("models", models.router),
    ("tradebots", tradebots.router),
    ("user_login", user_login.router),
    ("users_tradebots", users_tradebots.router),
    ("results", results.router),
    ("predictions", predictions.router),
    ("sparkreceive", model_predict.router)
]

for route_name, router in routers:
    app.include_router(router, prefix=f"{common_prefix}/{route_name}", tags=[route_name])
    
# Connect to the database using SQLAlchemy and databases
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

# Create an instance of the Database class
database = Database(DATABASE_URL)
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)