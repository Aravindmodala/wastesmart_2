from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db  # ✅ Use this to get the database session
from models import Order  # ✅ Import the Order model (if exists)

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    """Fetch all orders from the database."""
    orders = db.query(Order).all()  # ✅ Query all orders
    return {"orders": orders}
