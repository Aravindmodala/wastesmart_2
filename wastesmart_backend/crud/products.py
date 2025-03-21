from sqlalchemy.orm import Session
from models import Product
from schemas import ProductCreate, ProductUpdate
from datetime import datetime, timezone
from fastapi import HTTPException

def create_product(db: Session, product: ProductCreate):
    """Creates a new product."""
    expiry_date = datetime.strptime(product.expiry_date, "%Y-%m-%d")  # ✅ Convert string to datetime

    db_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        quantity=product.quantity,
        expiry_date=expiry_date,
        vendor_id=product.vendor_id,
        created_at=datetime.now(timezone.utc)
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    # ✅ Convert to response format
    return {
        "id": db_product.id,
        "name": db_product.name,
        "description": db_product.description,
        "price": db_product.price,
        "quantity": db_product.quantity,
        "expiry_date": db_product.expiry_date.strftime("%Y-%m-%d"),
        "created_at": db_product.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "vendor_id": db_product.vendor_id,
        "charity_eligible": db_product.charity_eligible
    }

def get_products(db: Session):
    """Fetches all products and formats response."""
    products = db.query(Product).all()
    
    # ✅ Convert `expiry_date` & `created_at` to strings before returning
    return [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "quantity": p.quantity,
            "expiry_date": p.expiry_date.strftime("%Y-%m-%d") if p.expiry_date else "N/A",  # ✅ Handle None values
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S") if p.created_at else "N/A",  # ✅ Ensure created_at exists
            "vendor_id": p.vendor_id,
            "charity_eligible": p.charity_eligible
        }
        for p in products
    ]

def get_product(db: Session, product_id: int):
    """Fetches a single product by ID and formats response."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return None

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "quantity": product.quantity,
        "expiry_date": product.expiry_date.strftime("%Y-%m-%d") if product.expiry_date else "N/A",
        "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S") if product.created_at else "N/A",
        "vendor_id": product.vendor_id,
        "charity_eligible": product.charity_eligible
    }


def update_product(db: Session, product_id: int, product_update: ProductUpdate):
    """Updates product details."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return None

    if product_update.name:
        db_product.name = product_update.name
    if product_update.description:
        db_product.description = product_update.description
    if product_update.price:
        db_product.price = product_update.price
    if product_update.quantity is not None:  # ✅ Allow updating quantity
        db_product.quantity = product_update.quantity
    if product_update.expiry_date:
        try:
            db_product.expiry_date = datetime.strptime(product_update.expiry_date, "%Y-%m-%d")  # ✅ Convert back to datetime
        except ValueError:
            pass  # ✅ Prevent crash if incorrect format is provided

    db.commit()
    db.refresh(db_product)

    # ✅ Convert to response format
    return {
        "id": db_product.id,
        "name": db_product.name,
        "description": db_product.description,
        "price": db_product.price,
        "quantity": db_product.quantity,
        "expiry_date": db_product.expiry_date.strftime("%Y-%m-%d"),
        "created_at": db_product.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "vendor_id": db_product.vendor_id,
        "charity_eligible": db_product.charity_eligible
    }


def delete_product(db: Session, product_id: int):
    """Deletes a product."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product
