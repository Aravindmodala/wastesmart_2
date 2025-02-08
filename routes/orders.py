from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.orders import create_order, get_orders, get_order, update_order, delete_order
from schemas import OrderCreate, OrderUpdate, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderResponse)
def add_order(order: OrderCreate, db: Session = Depends(get_db)):
    """Creates a new order."""
    new_order = create_order(db, order)
    if new_order is None:
        raise HTTPException(status_code=400, detail="Invalid product ID")
    if "error" in new_order:
        raise HTTPException(status_code=400, detail=new_order["error"])
    return new_order

@router.get("/", response_model=list[OrderResponse])
def list_orders(db: Session = Depends(get_db)):
    """Fetch all orders."""
    return get_orders(db)

@router.get("/{order_id}", response_model=OrderResponse)
def get_single_order(order_id: int, db: Session = Depends(get_db)):
    """Fetch a single order by ID."""
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}", response_model=OrderResponse)
def modify_order(order_id: int, order_update: OrderUpdate, db: Session = Depends(get_db)):
    """Update an order."""
    updated_order = update_order(db, order_id, order_update)
    if not updated_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return updated_order

@router.delete("/{order_id}")
def remove_order(order_id: int, db: Session = Depends(get_db)):
    """Delete an order."""
    order = delete_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted successfully"}
