from sqlalchemy.orm import Session
from models import Order, Product
from schemas import OrderCreate, OrderUpdate
from datetime import datetime

def create_order(db: Session, order: OrderCreate):
    """Creates a new order and calculates total price."""
    product = db.query(Product).filter(Product.id == order.product_id).first()
    if not product:
        return None  # Product doesn't exist

    if product.quantity < order.quantity:
        return {"error": "Not enough stock available"}

    total_price = product.price * order.quantity

    db_order = Order(
        user_id=order.user_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_price=total_price
    )
    
    product.quantity -= order.quantity  # ✅ Reduce stock after purchase

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session):
    """Fetches all orders and formats response."""
    orders = db.query(Order).all()
    return [
        {
            "id": o.id,
            "user_id": o.user_id,
            "product_id": o.product_id,
            "quantity": o.quantity,
            "total_price": o.total_price,
            "status": o.status,
            "created_at": o.created_at.strftime("%Y-%m-%d %H:%M:%S") if o.created_at else "N/A"
        }
        for o in orders
    ]

def get_order(db: Session, order_id: int):
    """Fetches a single order by ID."""
    o = db.query(Order).filter(Order.id == order_id).first()
    if not o:
        return None
    return {
        "id": o.id,
        "user_id": o.user_id,
        "product_id": o.product_id,
        "quantity": o.quantity,
        "total_price": o.total_price,
        "status": o.status,
        "created_at": o.created_at.strftime("%Y-%m-%d %H:%M:%S") if o.created_at else "N/A"
    }

def update_order(db: Session, order_id: int, order_update: OrderUpdate):
    """Updates order status."""
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        return None

    if order_update.status:
        db_order.status = order_update.status

    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int):
    """Deletes an order."""
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if db_order:
        db.delete(db_order)
        db.commit()
    return db_order

