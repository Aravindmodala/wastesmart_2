from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, Boolean, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone

# ====================== CORE TABLES ======================

# User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="customer")  # Can be 'customer', 'vendor', 'charity'

    orders = relationship("Order", back_populates="user")
    payments = relationship("Payment", back_populates="user")
    donations = relationship("Donation", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

# Vendor Model
class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    location = Column(String, nullable=False)

    products = relationship("Product", back_populates="vendor")
    reviews = relationship("Review", back_populates="vendor")

# Product Model
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    expiry_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    charity_eligible = Column(Boolean, default=False)  # Can this be donated?

    vendor = relationship("Vendor", back_populates="products")
    orders = relationship("Order", back_populates="product")
    expiry_tracking = relationship("ExpiryTracking", uselist=False, back_populates="product")
    charity_donations = relationship("CharityDonation", back_populates="product")

# Order Model
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(String, default="pending")  # 'pending', 'completed', 'canceled'
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    product = relationship("Product", back_populates="orders")

# ====================== EXPIRY & CHARITY TABLES ======================

# Expiry Tracking Model
class ExpiryTracking(Base):
    __tablename__ = "expiry_tracking"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), unique=True)
    discount_percent = Column(Float, nullable=False)
    expiry_date = Column(DateTime, nullable=False)

    product = relationship("Product", back_populates="expiry_tracking")

# Charity Model
class Charity(Base):
    __tablename__ = "charities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    website = Column(String, nullable=True)

    donations = relationship("Donation", back_populates="charity")
    charity_donations = relationship("CharityDonation", back_populates="charity")

# Charity Donation Model (Tracks donated products)
class CharityDonation(Base):
    __tablename__ = "charity_donations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    charity_id = Column(Integer, ForeignKey("charities.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    donation_date = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    charity = relationship("Charity", back_populates="charity_donations")
    product = relationship("Product", back_populates="charity_donations")

# ====================== PAYMENTS & TRANSACTIONS ======================

# Payment Model (Tracks user payments for purchases)
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    order_id = Column(Integer, ForeignKey("orders.id"))
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending")  # 'pending', 'completed', 'failed'
    payment_method = Column(String, nullable=False)  # 'card', 'paypal', 'upi'
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="payments")
    order = relationship("Order")

# Donation Model (Tracks monetary donations to charities)
class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    charity_id = Column(Integer, ForeignKey("charities.id"))
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending")  # 'pending', 'completed', 'failed'
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="donations")
    charity = relationship("Charity", back_populates="donations")

# ====================== NOTIFICATIONS & REVIEWS ======================

# Notification Model
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text, nullable=False)
    read_status = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")

# Review Model (Users reviewing vendors)
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    rating = Column(Integer, nullable=False)  # Scale: 1-5
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    vendor = relationship("Vendor", back_populates="reviews")
