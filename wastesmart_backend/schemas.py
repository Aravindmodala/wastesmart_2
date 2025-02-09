from pydantic import BaseModel, EmailStr
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
    created_at: datetime

    class Config:
        from_attributes = True  # ✅ Pydantic V2 fix

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

class VendorCreate(BaseModel):
    name: str
    contact: str
    location: str

class VendorUpdate(BaseModel):
    name: Optional[str] = None
    contact: Optional[str] = None
    location: Optional[str] = None

class VendorResponse(BaseModel):
    id: int
    name: str
    contact: str
    location: str
    created_at: str  # ✅ Ensure created_at is formatted correctly

    class Config:
        from_attributes = True  # ✅ Ensures automatic conversion for ORM models

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






