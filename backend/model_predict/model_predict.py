from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from database.database import SessionLocal
from pydantic import BaseModel
import json
router = APIRouter()
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import base64
import gymnasium as gym
import gym_anytrading
from gym_anytrading.envs import Actions
from repositories.results import create_result
from repositories.predictions import create_prediction
from stable_baselines3 import A2C
import datetime
import quantstats as qs
from gym_anytrading.envs import ForexEnv

import os
def my_process_data(env):
    start = env.frame_bound[0] - env.window_size
    end = env.frame_bound[1]
    prices = env.df.loc[:, 'Close'].to_numpy()[start:end]
    signal_features = env.df.loc[:, ['Close', 'High', 'Low', 'Volume', 'Turbulence', 'RSI']].to_numpy()[start:end]
    return prices, signal_features


class MyForexEnv(ForexEnv):
    _process_data = my_process_data



def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
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

def train_model(env, model_type, policy='MlpPolicy', total_timesteps=1000):
    """
    Trains a model on the given environment.

    :param env: Trading environment.
    :param model_type: Type of the model to train (e.g., A2C, DQN, etc.).
    :param policy: Policy for the model.
    :param total_timesteps: Total timesteps for training.
    :return: Trained model.
    """
    model = model_type(policy, env=env)
    model.learn(total_timesteps=total_timesteps)
    return model


def setup_trading_environment(train_df, test_df, window_size):
    """
    Sets up the training and trading environment.

    :param train_df: DataFrame with training data.
    :param window_size: Size of the moving window for the trading environment.
    :return: Initialized trading environment.
    """
    class MyForexEnv(ForexEnv):
        _process_data = my_process_data


    start_index = window_size
    end_index = len(train_df)
    env = MyForexEnv(df=train_df, window_size=window_size, frame_bound=(start_index, end_index))

    end_trade_index = len(test_df)
    env_trade = MyForexEnv(df=test_df, window_size=window_size, frame_bound=(start_index, end_trade_index))
    return env, env_trade

def predict_actions_and_visualize(env, model, tic_name, model_name, period):
    """
    Predicts actions using the trained model and visualizes the results.

    :param env: Trading environment.
    :param model: Trained model.
    :param tic_name: Name of the ticker.
    :param model_name: Name of the model.
    :param period: Trading period information.
    :return: Action statistics and information.
    """
    action_stats = {Actions.Sell: 0, Actions.Buy: 0}
    observation, info = env.reset(seed=2023)

    while True:
        action, _states = model.predict(observation)
        action_stats[Actions(action)] += 1
        observation, reward, terminated, truncated, info = env.step(action)
        done = terminated or truncated
        if done:
            break

    env.close()
    
    plt.figure(figsize=(16, 6))
    env.unwrapped.render_all()
    
    # Create the folder if it doesn't exist
    folder_path = f"png_result/{period}"
    os.makedirs(folder_path, exist_ok=True)
    
    # Save the plot as a PNG file with a specific name
    file_name = f"{folder_path}/{tic_name}-{model_name}-{info['total_reward']}-{info['total_profit']}.png"
    plt.savefig(file_name)
    with open(file_name, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode()

    # Show the plot (optional)
    # plt.show()
    return action_stats, info, encoded_string, action

@router.post("/predictions_values")
def receive_values(payload: str = Body(...), db: Session = Depends(get_db)):
    try:
        predictions = json.loads(payload)
        df = pd.DataFrame(predictions)
        # print(df)

        # Chuyển cột 'datadate' sang dạng datetime và định dạng lại nó
        df['Date'] = pd.to_datetime(df['Date'], format='%Y%m%d%H%M%S')
        # df.to_csv("fulldf.csv")
        # # Đặt cột 'Date' làm chỉ mục cho DataFrame
        df.set_index('Date', inplace=True)
        # print(df)
        df=df.fillna(0)
        split_idx = int(0.8 * len(df))
        # # Split the DataFrame
        train_df = df[:split_idx]
        test_df = df[split_idx:]
        # train_df.to_csv('traindf.csv')
        env_train , env_trade = setup_trading_environment(train_df=train_df, test_df=test_df, window_size=10)
        action_stats = {Actions.Sell: 0, Actions.Buy: 0}
        observation, info = env_train.reset(seed=2023)
        env_train.reset(seed=2023)
        model = train_model(env_train,  model_type=A2C, total_timesteps=5000)
        action_stats,info, result_base64, action = predict_actions_and_visualize(env=env_trade,model=model,tic_name="USDCHF", model_name="TD3", period="m30")
                # Extract relevant information from `info` or calculate as needed
        sell_traded = action_stats[Actions.Sell]
        buy_traded = action_stats[Actions.Buy]
        profit = info.get('total_profit', 0) *10000
        timestamp = int(test_df.index[-1].timestamp())

        # Create and save the result
        create_result(db=db, tradebot_id=1, timestamp=timestamp, profit=profit, sell_traded=sell_traded,buy_traded=buy_traded,  img_base64=result_base64)
        # env_trade.close()"
        print("action_stats:", action_stats)
        print("action:", action)

        # Get the last Close price from the DataFrame
        current_close_price = df['Close'].iloc[-1]

        # Calculate the predicted price based on the action
        if action == 0:  # Sell
            predict_price = current_close_price * 0.95
        elif action == 1:  # Buy
            predict_price = current_close_price * 1.05
        create_prediction(db=db,tradebot_id=1,predict_time=timestamp+30, predict_action=int(action), predict_price=predict_price)
        print("info:", info)
        return {"message": "JSON parsed and received successfully"}
    except json.JSONDecodeError as json_error:
        print(f"JSON decode error: {json_error}")
        raise HTTPException(status_code=400, detail="Invalid JSON")
    except ValueError as val_error:
        print(f"Value error: {val_error}")
        raise HTTPException(status_code=422, detail=str(val_error))
    except Exception as e:
        print(f"Unknown error: {e}")
        raise HTTPException(status_code=422, detail=str(e))