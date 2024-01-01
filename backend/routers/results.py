from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories import results as results_repository
from database.database import SessionLocal

router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# @router.post("/results/")
# def create_result(
#     tradebot_id: int, 
#     timestamp: int, 
#     profit: float, 
#     won_trades: int, 
#     total_trades: int, 
#     win_ratio: float, 
#     db: Session = Depends(get_db)
# ):
#     return results_repository.create_result(
#         db=db, 
#         tradebot_id=tradebot_id, 
#         timestamp=timestamp, 
#         profit=profit, 
#         won_trades=won_trades, 
#         total_trades=total_trades, 
#         win_ratio=win_ratio
#     )

# @router.get("/results/{result_id}")
# def read_result(result_id: int, db: Session = Depends(get_db)):
#     db_result = results_repository.get_result(db, result_id=result_id)
#     if db_result is None:
#         raise HTTPException(status_code=404, detail="Result not found")
#     return db_result

# @router.get("/results/")
# def read_results(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return results_repository.get_results(db, skip=skip, limit=limit)

# @router.put("/results/{result_id}")
# def update_result(
#     result_id: int,
#     tradebot_id: int, 
#     timestamp: int, 
#     profit: float, 
#     won_trades: int, 
#     total_trades: int, 
#     win_ratio: float, 
#     db: Session = Depends(get_db)
# ):
#     return results_repository.update_result(
#         db=db, 
#         result_id=result_id, 
#         tradebot_id=tradebot_id, 
#         timestamp=timestamp, 
#         profit=profit, 
#         won_trades=won_trades, 
#         total_trades=total_trades, 
#         win_ratio=win_ratio
#     )

# @router.delete("/results/{result_id}")
# def delete_result(result_id: int, db: Session = Depends(get_db)):
#     return results_repository.delete_result(db, result_id=result_id)
