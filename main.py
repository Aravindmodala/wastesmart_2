from fastapi import FastAPI
from routes.users import router as user_router
from routes.products import router as product_router
from routes.orders import router as order_router
from routes.payments import router as payment_router
from routes.vendors import router as vendor_router

# Initialize FastAPI App
app = FastAPI(title="WasteSmart API", version="1.0")

# Include API routes
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(product_router, prefix="/products", tags=["Products"])
app.include_router(order_router, prefix="/orders", tags=["Orders"])
app.include_router(payment_router, prefix="/payments", tags=["Payments"])
app.include_router(vendor_router, prefix="/vendors", tags=["Vendors"])

@app.get("/")
def home():
    return {"message": "Welcome to WasteSmart API!"}

