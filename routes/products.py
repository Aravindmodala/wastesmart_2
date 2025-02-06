from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, SessionLocal
from crud.products import create_product, get_products, get_product, update_product, delete_product
from schemas import ProductCreate, ProductUpdate, ProductResponse
router = APIRouter()

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=ProductResponse)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.get("/", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)

@router.get("/{product_id}", response_model=ProductResponse)
def get_single_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductResponse)
def modify_product(product_id: int, product_update: ProductUpdate, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product_update)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    product = delete_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

