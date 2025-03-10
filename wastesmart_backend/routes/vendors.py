from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from crud.vendors import create_vendor, get_vendors, get_vendor, update_vendor, delete_vendor, get_vendor_by_email
from schemas import VendorCreate, VendorUpdate, VendorResponse, VendorLogin
from models import Product, Vendor
from typing import List
from schemas import ProductResponse
from auth import authenticate_user, get_current_user, create_access_token 
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # ✅ Password hashing

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.post("/", response_model=VendorResponse)
def add_vendor(vendor: VendorCreate, db: Session = Depends(get_db)):
    """Creates a new vendor."""
    return create_vendor(db, vendor)

@router.get("/vendors/", response_model=list[VendorResponse])
def list_vendors(db: Session = Depends(get_db)):
    """Fetch all vendors."""
    vendors = db.query(Vendor).all()

    return [
        {
            "id": v.id,
            "name": v.name,
            "contact": v.contact or "N/A",
            "location": v.location or "N/A",  # ✅ Fix None value for `location`
            "created_at": v.created_at.isoformat() if v.created_at else "N/A",  # ✅ Convert datetime to string
            "email": v.email,
            "address": v.address or "N/A",
            "business_category": v.business_category or "N/A",
            "business_description": v.business_description or "N/A",
            "business_license": v.business_license or "N/A",
            "logo_url": v.logo_url or "",
            "operating_hours": v.operating_hours or {},
            "discount_policy": v.discount_policy or "N/A",
            "accepts_donations": v.accepts_donations if v.accepts_donations is not None else False,
            "bank_account": v.bank_account or "N/A",
            "upi_id": v.upi_id or "N/A",
        }
        for v in vendors
    ]

@router.get("/{vendor_id}", response_model=VendorResponse)
def get_single_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Fetch a single vendor by ID."""
    vendor = get_vendor(db, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    return {
        "id": vendor.id,
        "name": vendor.name,
        "contact": vendor.contact or "N/A",
        "location": vendor.location or "N/A",
        "created_at": vendor.created_at.isoformat() if vendor.created_at else "N/A",
        "email": vendor.email,
        "address": vendor.address or "N/A",
        "business_category": vendor.business_category or "N/A",
        "business_description": vendor.business_description or "N/A",
        "business_license": vendor.business_license or "N/A",
        "logo_url": vendor.logo_url or "",
        "operating_hours": vendor.operating_hours or {},
        "discount_policy": vendor.discount_policy or "N/A",
        "accepts_donations": vendor.accepts_donations if vendor.accepts_donations is not None else False,
        "bank_account": vendor.bank_account or "N/A",
        "upi_id": vendor.upi_id or "N/A",
    }

@router.put("/{vendor_id}", response_model=VendorResponse)
def modify_vendor(vendor_id: int, vendor_update: VendorUpdate, db: Session = Depends(get_db), current_vendor: Vendor = Depends(get_current_user)):
    """Update a vendor (only authenticated vendors can update their profile)."""
    if current_vendor.id != vendor_id:
        raise HTTPException(status_code=403, detail="You can only update your own profile")
    
    updated_vendor = update_vendor(db, vendor_id, vendor_update)
    if not updated_vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return updated_vendor

@router.delete("/{vendor_id}")
def remove_vendor(vendor_id: int, db: Session = Depends(get_db), current_vendor: Vendor = Depends(get_current_user)):
    """Delete a vendor (only authenticated vendors can delete their profile)."""
    if current_vendor.id != vendor_id:
        raise HTTPException(status_code=403, detail="You can only delete your own profile")

    vendor = delete_vendor(db, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return {"message": "Vendor deleted successfully"}

@router.get("/{vendor_id}/products", response_model=List[ProductResponse])
def get_products_by_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Fetch all products related to a particular vendor."""
    
    products = db.query(Product).filter(Product.vendor_id == vendor_id).all()
    
    if not products:
        raise HTTPException(status_code=404, detail="No products found for this vendor")

    return [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description or "No description available",
            "price": product.price,
            "expiry_date": product.expiry_date.isoformat() if product.expiry_date else "N/A",
            "charity_eligible": product.charity_eligible if product.charity_eligible is not None else False,
            "quantity": product.quantity,
            "created_at": product.created_at.isoformat() if product.created_at else "N/A",
            "vendor_id": product.vendor_id
        }
        for product in products
    ]

@router.post("/login")
def vendor_login(vendor: VendorLogin, db: Session = Depends(get_db)):
    """Authenticate vendor login using email and password."""
    
    db_vendor = get_vendor_by_email(db, vendor.email)  # ✅ Check if vendor exists
    if not db_vendor:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # ✅ Verify password
    if not pwd_context.verify(vendor.password, db_vendor.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # ✅ Return full vendor details for frontend use
    return {
        "message": "Login successful",
        "vendor_id": db_vendor.id,
        "vendor_name": db_vendor.name,
        "email": db_vendor.email,
        "contact": db_vendor.contact or "N/A",
        "business_category": db_vendor.business_category or "N/A",
        "location": db_vendor.location or "N/A",
        "created_at": db_vendor.created_at.isoformat() if db_vendor.created_at else "N/A",
        "address": db_vendor.address or "N/A",
        "business_description": db_vendor.business_description or "N/A",
        "business_license": db_vendor.business_license or "N/A",
        "logo_url": db_vendor.logo_url or "",
        "operating_hours": db_vendor.operating_hours or {},
        "discount_policy": db_vendor.discount_policy or "N/A",
        "accepts_donations": db_vendor.accepts_donations if db_vendor.accepts_donations is not None else False,
        "bank_account": db_vendor.bank_account or "N/A",
        "upi_id": db_vendor.upi_id or "N/A",
    }
