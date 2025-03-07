from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from crud.vendors import create_vendor, get_vendors, get_vendor, update_vendor, delete_vendor, get_vendor_by_email
from schemas import VendorCreate, VendorUpdate, VendorResponse, VendorLogin
from models import Product, Vendor
from typing import List
from schemas import ProductResponse
from auth import authenticate_user, get_current_user, create_access_token  # ✅ Import authentication functions
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # ✅ Password hashing

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.post("/", response_model=VendorResponse)
def add_vendor(vendor: VendorCreate, db: Session = Depends(get_db)):
    """Creates a new vendor."""
    return create_vendor(db, vendor)

@router.get("/", response_model=List[VendorResponse])
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
def get_products_by_vendor(vendor_id: int, db: Session = Depends(get_db), current_vendor: Vendor = Depends(get_current_user)):
    """Fetch products for a vendor (only authenticated vendors can view their products)."""
    if current_vendor.id != vendor_id:
        raise HTTPException(status_code=403, detail="You can only view your own products")

    products = db.query(Product).filter(Product.vendor_id == vendor_id).all()
    if not products:
        raise HTTPException(status_code=404, detail="No products found for this vendor")

    return products

@router.post("/login")
def vendor_login(vendor: VendorLogin, db: Session = Depends(get_db)):
    """Authenticate vendor login using email and password."""
    
    db_vendor = get_vendor_by_email(db, vendor.email)  # ✅ Check if vendor exists
    if not db_vendor:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # ✅ Verify password
    if not pwd_context.verify(vendor.password, db_vendor.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "vendor_id": db_vendor.id, "vendor_name": db_vendor.name}
