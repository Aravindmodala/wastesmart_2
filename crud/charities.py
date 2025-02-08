from sqlalchemy.orm import Session
from models import Charity
from schemas import CharityCreate, CharityUpdate

def create_charity(db: Session, charity: CharityCreate):
    """Creates a new charity."""
    db_charity = Charity(
        name=charity.name,
        location=charity.location,
        contact=charity.contact,
        website=charity.website
    )
    db.add(db_charity)
    db.commit()
    db.refresh(db_charity)
    return db_charity

def get_charities(db: Session):
    """Fetches all charities."""
    charities = db.query(Charity).all()
    return [
        {
            "id": c.id,
            "name": c.name,
            "location": c.location,
            "contact": c.contact,
            "website": c.website
        }
        for c in charities
    ]

def get_charity(db: Session, charity_id: int):
    """Fetches a single charity by ID."""
    c = db.query(Charity).filter(Charity.id == charity_id).first()
    if not c:
        return None
    return {
        "id": c.id,
        "name": c.name,
        "location": c.location,
        "contact": c.contact,
        "website": c.website
    }

def update_charity(db: Session, charity_id: int, charity_update: CharityUpdate):
    """Updates charity details."""
    db_charity = db.query(Charity).filter(Charity.id == charity_id).first()
    if not db_charity:
        return None

    if charity_update.name:
        db_charity.name = charity_update.name
    if charity_update.location:
        db_charity.location = charity_update.location
    if charity_update.contact:
        db_charity.contact = charity_update.contact
    if charity_update.website:
        db_charity.website = charity_update.website

    db.commit()
    db.refresh(db_charity)
    return db_charity

def delete_charity(db: Session, charity_id: int):
    """Deletes a charity."""
    db_charity = db.query(Charity).filter(Charity.id == charity_id).first()
    if db_charity:
        db.delete(db_charity)
        db.commit()
    return db_charity

