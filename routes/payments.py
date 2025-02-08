from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.payments import create_payment, get_payments, get_payment, update_payment, delete_payment
from schemas import PaymentCreate, PaymentUpdate, PaymentResponse

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.post("/", response_model=PaymentResponse)
def add_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    """Processes a new payment."""
    new_payment = create_payment(db, payment)
    if new_payment is None:
        raise HTTPException(status_code=400, detail="Invalid order ID")
    if "error" in new_payment:
        raise HTTPException(status_code=400, detail=new_payment["error"])
    return new_payment

@router.get("/", response_model=list[PaymentResponse])
def list_payments(db: Session = Depends(get_db)):
    """Fetch all payments."""
    return get_payments(db)

@router.get("/{payment_id}", response_model=PaymentResponse)
def get_single_payment(payment_id: int, db: Session = Depends(get_db)):
    """Fetch a single payment by ID."""
    payment = get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.put("/{payment_id}", response_model=PaymentResponse)
def modify_payment(payment_id: int, payment_update: PaymentUpdate, db: Session = Depends(get_db)):
    """Update a payment."""
    updated_payment = update_payment(db, payment_id, payment_update)
    if not updated_payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return updated_payment

@router.delete("/{payment_id}")
def remove_payment(payment_id: int, db: Session = Depends(get_db)):
    """Delete a payment."""
    payment = delete_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted successfully"}
