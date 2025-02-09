from sqlalchemy.orm import Session
from models import Vendor
from schemas import VendorCreate, VendorUpdate
from datetime import datetime

def create_vendor(db: Session, vendor: VendorCreate):
    """Creates a new vendor."""
    db_vendor = Vendor(
        name=vendor.name,
        contact=vendor.contact,
        location=vendor.location
    )
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def get_vendors(db: Session):
    """Fetches all vendors and formats response."""
    vendors = db.query(Vendor).all()
    return [
        {
            "id": v.id,
            "name": v.name,
            "contact": v.contact,
            "location": v.location,
            "created_at": v.created_at.strftime("%Y-%m-%d %H:%M:%S") if v.created_at else "N/A"
        }
        for v in vendors
    ]

def get_vendor(db: Session, vendor_id: int):
    """Fetches a single vendor by ID."""
    v = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not v:
        return None
    return {
        "id": v.id,
        "name": v.name,
        "contact": v.contact,
        "location": v.location,
        "created_at": v.created_at.strftime("%Y-%m-%d %H:%M:%S") if v.created_at else "N/A"
    }

def update_vendor(db: Session, vendor_id: int, vendor_update: VendorUpdate):
    """Updates vendor details."""
    db_vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not db_vendor:
        return None

    if vendor_update.name:
        db_vendor.name = vendor_update.name
    if vendor_update.contact:
        db_vendor.contact = vendor_update.contact
    if vendor_update.location:
        db_vendor.location = vendor_update.location

    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def delete_vendor(db: Session, vendor_id: int):
    """Deletes a vendor."""
    db_vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if db_vendor:
        db.delete(db_vendor)
        db.commit()
    return db_vendor

