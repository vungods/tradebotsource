from sqlalchemy.orm import Session
from models.database_models import UserTradebot, Tradebot, Model, Ticket, Result, Prediction

def create_tradebot(db: Session, name: str, description: str, model_id: int, ticket_id: int):
    db_tradebot = Tradebot(name=name, description=description, model_id=model_id, ticket_id=ticket_id)
    db.add(db_tradebot)
    db.commit()
    db.refresh(db_tradebot)
    return db_tradebot



def get_tradebots_by_user_id(db: Session, user_id: int):
    user_tradebot_ids = db.query(UserTradebot.tradebot_id).filter(UserTradebot.user_id == user_id).all()
    
    tradebots_details = []

    for tb_id in user_tradebot_ids:
        tradebot_id = tb_id[0]  # Extract the ID from the tuple
        tradebot_data = db.query(Tradebot, Model, Ticket).\
            join(Model, Tradebot.model_id == Model.id, isouter=True).\
            join(Ticket, Tradebot.ticket_id == Ticket.id, isouter=True).\
            filter(Tradebot.id == tradebot_id).\
            first()

        if tradebot_data:
            tradebot, model, ticket = tradebot_data
            tradebot_info = {
                "id": tradebot.id,
                "name": tradebot.name,
                "description": tradebot.description,
                "model_name": model.name if model else None,
                "ticket_name": ticket.name if ticket else None
            }
            tradebots_details.append(tradebot_info)

    return tradebots_details


def get_tradebot(db: Session, tradebot_id: int):
    return db.query(Tradebot).filter(Tradebot.id == tradebot_id).first()

def get_tradebots(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Tradebot).offset(skip).limit(limit).all()

def update_tradebot(db: Session, tradebot_id: int, name: str = None, description: str = None, model_id: int = None, ticket_id: int = None):
    db_tradebot = db.query(Tradebot).filter(Tradebot.id == tradebot_id).first()
    if not db_tradebot:
        return {"message": "Tradebot not found"}

    if name is not None:
        db_tradebot.name = name
    if description is not None:
        db_tradebot.description = description
    if model_id is not None:
        db_tradebot.model_id = model_id
    if ticket_id is not None:
        db_tradebot.ticket_id = ticket_id
    
    db.commit()
    db.refresh(db_tradebot)
    return db_tradebot


def delete_tradebot(db: Session, tradebot_id: int):
    db_tradebot = db.query(Tradebot).filter(Tradebot.id == tradebot_id).first()
    if db_tradebot:
        db.delete(db_tradebot)
        db.commit()
    return {"message": "Tradebot deleted successfully"}




def get_tradebot_details(db: Session, tradebot_id: int):
    # Fetch the tradebot details along with model and ticket names
    tradebot_details = db.query(Tradebot, Model.name.label("model_name"), Ticket.name.label("ticket_name")).\
        join(Model, Tradebot.model_id == Model.id, isouter=True).\
        join(Ticket, Tradebot.ticket_id == Ticket.id, isouter=True).\
        filter(Tradebot.id == tradebot_id).\
        first()

    # Fetch the latest prediction for the given tradebot_id
    latest_prediction = db.query(Prediction).\
        filter(Prediction.tradebot_id == tradebot_id).\
        order_by(Prediction.predict_time.desc()).\
        first()

    # Fetch the latest result for the given tradebot_id
    latest_result = db.query(Result).\
        filter(Result.tradebot_id == tradebot_id).\
        order_by(Result.timestamp.desc()).\
        first()

    # Convert to dictionaries if not None
    prediction_dict = latest_prediction.__dict__ if latest_prediction else None
    result_dict = latest_result.__dict__ if latest_result else None
    tradebot_dict = tradebot_details[0].__dict__ if tradebot_details and tradebot_details[0] else None
    model_name = tradebot_details[1] if tradebot_details else None
    ticket_name = tradebot_details[2] if tradebot_details else None

    # Combine all details into a single dictionary
    return {
        "tradebot": tradebot_dict,
        "model_name": model_name,
        "ticket_name": ticket_name,
        "latest_prediction": prediction_dict,
        "latest_result": result_dict
    }