from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.charities import create_charity, get_charities, get_charity, update_charity, delete_charity
from schemas import CharityCreate, CharityUpdate, CharityResponse

router = APIRouter(prefix="/charities", tags=["Charities"])

@router.post("/", response_model=CharityResponse)
def add_charity(charity: CharityCreate, db: Session = Depends(get_db)):
    """Creates a new charity."""
    return create_charity(db, charity)

@router.get("/", response_model=list[CharityResponse])
def list_charities(db: Session = Depends(get_db)):
    """Fetch all charities."""
    return get_charities(db)

@router.get("/{charity_id}", response_model=CharityResponse)
def get_single_charity(charity_id: int, db: Session = Depends(get_db)):
    """Fetch a single charity by ID."""
    charity = get_charity(db, charity_id)
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    return charity

@router.put("/{charity_id}", response_model=CharityResponse)
def modify_charity(charity_id: int, charity_update: CharityUpdate, db: Session = Depends(get_db)):
    """Update a charity."""
    updated_charity = update_charity(db, charity_id, charity_update)
    if not updated_charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    return updated_charity

@router.delete("/{charity_id}")
def remove_charity(charity_id: int, db: Session = Depends(get_db)):
    """Delete a charity."""
    charity = delete_charity(db, charity_id)
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    return {"message": "Charity deleted successfully"}
