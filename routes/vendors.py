from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.vendors import create_vendor, get_vendors, get_vendor, update_vendor, delete_vendor
from schemas import VendorCreate, VendorUpdate, VendorResponse

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.post("/", response_model=VendorResponse)
def add_vendor(vendor: VendorCreate, db: Session = Depends(get_db)):
    """Creates a new vendor."""
    return create_vendor(db, vendor)

@router.get("/", response_model=list[VendorResponse])
def list_vendors(db: Session = Depends(get_db)):
    """Fetch all vendors."""
    return get_vendors(db)

@router.get("/{vendor_id}", response_model=VendorResponse)
def get_single_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Fetch a single vendor by ID."""
    vendor = get_vendor(db, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return vendor

@router.put("/{vendor_id}", response_model=VendorResponse)
def modify_vendor(vendor_id: int, vendor_update: VendorUpdate, db: Session = Depends(get_db)):
    """Update a vendor."""
    updated_vendor = update_vendor(db, vendor_id, vendor_update)
    if not updated_vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return updated_vendor

@router.delete("/{vendor_id}")
def remove_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Delete a vendor."""
    vendor = delete_vendor(db, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return {"message": "Vendor deleted successfully"}