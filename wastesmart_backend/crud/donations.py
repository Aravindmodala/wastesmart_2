from sqlalchemy.orm import Session
from models import Donation, CharityDonation, Product
from schemas import DonationCreate, CharityDonationCreate
from datetime import datetime

# ✅ Handle Monetary Donations
def create_donation(db: Session, donation: DonationCreate):
    """Creates a new monetary donation."""
    db_donation = Donation(
        user_id=donation.user_id,
        charity_id=donation.charity_id,
        amount=donation.amount
    )
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

def get_donations(db: Session):
    """Fetches all monetary donations."""
    return db.query(Donation).all()

def update_donation_status(db: Session, donation_id: int, status: str):
    """Updates donation status."""
    db_donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not db_donation:
        return None

    db_donation.status = status
    db.commit()
    db.refresh(db_donation)
    return db_donation

# ✅ Handle Product Donations
def create_charity_donation(db: Session, donation: CharityDonationCreate):
    """Creates a new product donation."""
    product = db.query(Product).filter(Product.id == donation.product_id).first()
    if not product:
        return {"error": "Product not found"}

    if product.quantity < donation.quantity:
        return {"error": "Not enough stock available"}

    product.quantity -= donation.quantity  # ✅ Reduce product stock

    db_donation = CharityDonation(
        user_id=donation.user_id,
        charity_id=donation.charity_id,
        product_id=donation.product_id,
        quantity=donation.quantity
    )

    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

