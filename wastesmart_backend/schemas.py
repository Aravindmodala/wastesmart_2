from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import Optional
from datetime import datetime

# Schema for token data (used to extract user details from JWT)
class TokenData(BaseModel):
    email: Optional[str] = None

# Schema for user registration
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "customer" 

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None

# Schema for login response (JWT token)
class Token(BaseModel):
    access_token: str
    token_type: str

# Schema to return user data (excluding password)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True  # Enables ORM support for SQLAlchemy models

# Schema for product creation
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    quantity: int
    expiry_date: str  # YYYY-MM-DD format
    vendor_id: int
    

class ProductUpdate(BaseModel): 
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    expiry_date: Optional[str] = None

class ProductResponse(ProductCreate):
    id: int
    created_at: str  # ✅ Ensure this is a string
    vendor_id: int

    class Config:
        from_attributes = True  # ✅ Required for FastAPI with Pydantic V2

    @field_validator("created_at", "expiry_date", mode="before")
    def convert_datetime_to_str(cls, value):
        """Converts datetime to string format if needed."""
        if isinstance(value, datetime):
            return value.isoformat()  # Converts to 'YYYY-MM-DDTHH:MM:SS'
        return value  # If already a string, return as is

# Schema for order creation
class OrderCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int

class OrderUpdate(BaseModel):
    status: Optional[str] = None  # 'pending', 'completed', 'canceled'

class OrderResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    total_price: float
    status: str
    created_at: str 
    
    class Config:
        from_attributes = True
    
# Schema for payment creation

class PaymentCreate(BaseModel):
    user_id: int
    order_id: int
    amount: float
    payment_method: str  # 'card', 'paypal', 'upi'

class PaymentUpdate(BaseModel):
    status: Optional[str] = None  # 'pending', 'completed', 'failed'

class PaymentResponse(BaseModel):
    id: int
    user_id: int
    order_id: int
    amount: float
    status: str
    payment_method: str
    created_at: str  # ✅ Ensure created_at is formatted correctly

    class Config:
        from_attributes = True  # ✅ Ensures automatic conversion for ORM models    

# Schema for vendor creation

class VendorLogin(BaseModel):
    email: EmailStr
    password: str

class VendorCreate(BaseModel):
    name: str
    email: EmailStr  # ✅ NEW: Vendor authentication
    password: str  # ✅ NEW: Store hashed password later
    contact: str
    address: str  # ✅ NEW: Full business address
    location: str
    business_category: str  # ✅ NEW: Grocery, Pharmacy, etc.
    business_description: Optional[str] = None
    business_license: Optional[str] = None
    logo_url: Optional[str] = None
    operating_hours: Optional[dict[str, str]] = None  # ✅ JSON format
    discount_policy: Optional[str] = None
    accepts_donations: Optional[bool] = False
    bank_account: Optional[str] = None
    upi_id: Optional[str] = None


class VendorUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None  # ✅ Allow email updates
    password: Optional[str] = None  # ✅ Allow password updates
    contact: Optional[str] = None
    address: Optional[str] = None
    
    business_category: Optional[str] = None
    business_description: Optional[str] = None
    business_license: Optional[str] = None
    logo_url: Optional[str] = None
    operating_hours: Optional[dict[str, str]] = None
    discount_policy: Optional[str] = None
    accepts_donations: Optional[bool] = None
    bank_account: Optional[str] = None
    upi_id: Optional[str] = None


class VendorResponse(BaseModel):
    id: int
    name: str
    contact: str
    location: str
    created_at: str  # ✅ Ensure it's returned as a string
    email: str
    address: Optional[str] = None
    business_category: Optional[str] = None
    business_description: Optional[str] = None
    business_license: Optional[str] = None
    logo_url: Optional[str] = None
    operating_hours: Optional[dict] = None
    discount_policy: Optional[str] = None
    accepts_donations: Optional[bool] = None
    bank_account: Optional[str] = None
    upi_id: Optional[str] = None

    class Config:
        orm_mode = True

    @staticmethod
    def format_datetime(value: datetime | None) -> str | None:
        return value.isoformat() if value else None

    def dict(self, *args, **kwargs):
        result = super().dict(*args, **kwargs)
        result["created_at"] = self.format_datetime(result["created_at"])
        return result
# Schema for charity creation
class CharityCreate(BaseModel):
    name: str
    location: str
    contact: str
    website: Optional[str] = None

class CharityUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    contact: Optional[str] = None
    website: Optional[str] = None

class CharityResponse(BaseModel):
    id: int
    name: str
    location: str
    contact: str
    website: Optional[str]

    class Config:
        from_attributes = True 

# Schema for notification creation
class NotificationCreate(BaseModel):
    user_id: int
    message: str

class NotificationUpdate(BaseModel):
    read_status: Optional[bool] = None  # ✅ Allows updating read status

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    message: str
    read_status: bool
    created_at: str  # ✅ Ensures created_at is formatted correctly

    class Config:
        from_attributes = True  # ✅ Ensures automatic conversion for ORM models

# Schema for donation creation
# ✅ Monetary Donation Schema
class DonationCreate(BaseModel):
    user_id: int
    charity_id: int
    amount: float  # ✅ For monetary donations

# ✅ Product Donation Schema
class CharityDonationCreate(BaseModel):
    user_id: int
    charity_id: int
    product_id: int
    quantity: int  # ✅ For product donations

# ✅ Donation Response Schema
class DonationResponse(BaseModel):
    id: int
    user_id: int
    charity_id: int
    amount: Optional[float] = None  # ✅ Optional for product donations
    status: str
    created_at: str

    class Config:
        from_attributes = True  # ✅ Ensures automatic conversion for ORM models

# ✅ Charity Donation Response Schema
class CharityDonationResponse(BaseModel):
    id: int
    user_id: int
    charity_id: int
    product_id: int
    quantity: int
    donation_date: str

    class Config:
        from_attributes = True






