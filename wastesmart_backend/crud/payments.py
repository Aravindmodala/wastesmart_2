from sqlalchemy.orm import Session
from models import Payment, Order
from schemas import PaymentCreate, PaymentUpdate
from datetime import datetime

def create_payment(db: Session, payment: PaymentCreate):
    """Processes a new payment."""
    order = db.query(Order).filter(Order.id == payment.order_id).first()
    if not order:
        return None  # Order doesn't exist

    if order.total_price != payment.amount:
        return {"error": "Payment amount does not match order total"}

    db_payment = Payment(
        user_id=payment.user_id,
        order_id=payment.order_id,
        amount=payment.amount,
        payment_method=payment.payment_method
    )
    
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payments(db: Session):
    """Fetches all payments and formats response."""
    payments = db.query(Payment).all()
    return [
        {
            "id": p.id,
            "user_id": p.user_id,
            "order_id": p.order_id,
            "amount": p.amount,
            "status": p.status,
            "payment_method": p.payment_method,
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S") if p.created_at else "N/A"
        }
        for p in payments
    ]

def get_payment(db: Session, payment_id: int):
    """Fetches a single payment by ID."""
    p = db.query(Payment).filter(Payment.id == payment_id).first()
    if not p:
        return None
    return {
        "id": p.id,
        "user_id": p.user_id,
        "order_id": p.order_id,
        "amount": p.amount,
        "status": p.status,
        "payment_method": p.payment_method,
        "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S") if p.created_at else "N/A"
    }

def update_payment(db: Session, payment_id: int, payment_update: PaymentUpdate):
    """Updates payment status."""
    db_payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not db_payment:
        return None

    if payment_update.status:
        db_payment.status = payment_update.status

    db.commit()
    db.refresh(db_payment)
    return db_payment

def delete_payment(db: Session, payment_id: int):
    """Deletes a payment."""
    db_payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if db_payment:
        db.delete(db_payment)
        db.commit()
    return db_payment
 
