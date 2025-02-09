from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.donations import create_donation, create_charity_donation, get_donations, update_donation_status
from schemas import DonationCreate, CharityDonationCreate, DonationResponse, CharityDonationResponse

router = APIRouter(prefix="/donations", tags=["Donations"])

@router.post("/", response_model=DonationResponse)
def donate_money(donation: DonationCreate, db: Session = Depends(get_db)):
    """Creates a new monetary donation."""
    return create_donation(db, donation)

@router.get("/", response_model=list[DonationResponse])
def list_donations(db: Session = Depends(get_db)):
    """Fetch all monetary donations."""
    return get_donations(db)

@router.put("/{donation_id}/status")
def update_donation(donation_id: int, status: str, db: Session = Depends(get_db)):
    """Update donation status."""
    updated_donation = update_donation_status(db, donation_id, status)
    if not updated_donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return updated_donation

@router.post("/charity", response_model=CharityDonationResponse)
def donate_product(donation: CharityDonationCreate, db: Session = Depends(get_db)):
    """Creates a new product donation."""
    new_donation = create_charity_donation(db, donation)
    if "error" in new_donation:
        raise HTTPException(status_code=400, detail=new_donation["error"])
    return new_donation
