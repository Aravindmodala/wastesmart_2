from sqlalchemy.orm import Session
from models import Vendor
from schemas import VendorCreate, VendorUpdate
from datetime import datetime
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # ✅ Password hashing

def create_vendor(db: Session, vendor: VendorCreate):
    """Creates a new vendor with hashed password."""
    hashed_password = pwd_context.hash(vendor.password)  # ✅ Hash password

    db_vendor = Vendor(
        name=vendor.name,
        email=vendor.email.lower(),  # ✅ Store email in lowercase for consistency
        password=hashed_password,  # ✅ Store hashed password
        contact=vendor.contact,
        address=vendor.address,
        business_category=vendor.business_category,
        business_description=vendor.business_description or "",
        business_license=vendor.business_license or None,
        logo_url=vendor.logo_url or None,
        operating_hours=vendor.operating_hours or {},
        discount_policy=vendor.discount_policy or None,
        accepts_donations=vendor.accepts_donations if vendor.accepts_donations is not None else False,
        bank_account=vendor.bank_account or None,
        upi_id=vendor.upi_id or None,
        created_at=datetime.utcnow()
    )

    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def get_vendors(db: Session):
    """Fetch all vendors."""
    return db.query(Vendor).all()

def get_vendor(db: Session, vendor_id: int):
    """Fetch a single vendor by ID."""
    return db.query(Vendor).filter(Vendor.id == vendor_id).first()

def get_vendor_by_email(db: Session, email: str):
    """Fetch a vendor by email (case-insensitive)."""
    return db.query(Vendor).filter(Vendor.email.ilike(email)).first()  # ✅ Case insensitive lookup

def update_vendor(db: Session, vendor_id: int, vendor_update: VendorUpdate):
    """Update vendor details."""
    db_vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not db_vendor:
        return None

    if vendor_update.name:
        db_vendor.name = vendor_update.name
    if vendor_update.email:
        db_vendor.email = vendor_update.email.lower()  # ✅ Store email in lowercase
    if vendor_update.password:
        db_vendor.password = pwd_context.hash(vendor_update.password)  # ✅ Hash updated password
    if vendor_update.contact:
        db_vendor.contact = vendor_update.contact
    if vendor_update.address:
        db_vendor.address = vendor_update.address
    if vendor_update.business_category:
        db_vendor.business_category = vendor_update.business_category
    if vendor_update.business_description:
        db_vendor.business_description = vendor_update.business_description
    if vendor_update.business_license:
        db_vendor.business_license = vendor_update.business_license
    if vendor_update.logo_url:
        db_vendor.logo_url = vendor_update.logo_url
    if vendor_update.operating_hours:
        db_vendor.operating_hours = vendor_update.operating_hours
    if vendor_update.discount_policy:
        db_vendor.discount_policy = vendor_update.discount_policy
    if vendor_update.accepts_donations is not None:
        db_vendor.accepts_donations = vendor_update.accepts_donations
    if vendor_update.bank_account:
        db_vendor.bank_account = vendor_update.bank_account
    if vendor_update.upi_id:
        db_vendor.upi_id = vendor_update.upi_id

    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def delete_vendor(db: Session, vendor_id: int):
    """Delete a vendor."""
    db_vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if db_vendor:
        db.delete(db_vendor)
        db.commit()
    return db_vendor
