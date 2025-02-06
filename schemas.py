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




