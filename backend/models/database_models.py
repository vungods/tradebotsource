# models/database_models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Numeric, Boolean, ForeignKey, BigInteger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, ForeignKey
from datetime import datetime
Base = declarative_base()

class Model(Base):
    __tablename__ = "models"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    policy_type = Column(String(50))

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), index=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(100), nullable=False)
    role =   Column(String(100), nullable=False, default="user")
    created_at = Column(DateTime, default=Text('CURRENT_TIMESTAMP'))

class Tradebot(Base):
    __tablename__ = "tradebots"
    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer, ForeignKey('models.id'))
    ticket_id = Column(Integer, ForeignKey('tickets.id'))
    name = Column(String, nullable=False)
    description = Column(Text)
    # Add other necessary fields for the tradebot

class UserTradebot(Base):
    __tablename__ = "user_tradebot"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    tradebot_id = Column(Integer, ForeignKey('tradebots.id'))
    registration_date = Column(DateTime, default=Text('CURRENT_TIMESTAMP'))
    expiry_date = Column(BigInteger)


class Result(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True, index=True)
    tradebot_id = Column(Integer, ForeignKey('tradebots.id'))
    timestamp = Column(BigInteger)
    profit = Column(Numeric(15, 2), nullable=False)
    buy_traded = Column(Integer)  
    sell_traded = Column(Integer)  
    img_base64 = Column(String) 

    
class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    tradebot_id = Column(Integer, ForeignKey('tradebots.id'))
    predict_time = Column(BigInteger)
    predict_action = Column(Integer)
    predict_price = Column(Numeric)


class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)



