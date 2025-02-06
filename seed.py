from database import SessionLocal
from models import User, Vendor, Product, Order, Payment, Charity, Donation, CharityDonation, Notification, Review, OrderStatusEnum, PaymentStatusEnum, PaymentMethodEnum
from datetime import datetime, timedelta

# Open a new database session
db = SessionLocal()

try:
    print("Inserting sample data...")

    # ✅ Check and insert users individually
    users = [
        {"name": "Alice Johnson", "email": "alice@example.com", "password": "hashedpassword123", "role": "customer"},
        {"name": "Bob Vendor", "email": "bobvendor@example.com", "password": "hashedpassword456", "role": "vendor"},
        {"name": "Charity Admin", "email": "charity@example.com", "password": "hashedpassword789", "role": "charity"}
    ]
    for user in users:
        if not db.query(User).filter(User.email == user["email"]).first():
            db.add(User(**user))
    db.commit()

    # ✅ Check and insert vendors
    vendors = [
        {"name": "Healthy Foods", "contact": "123-456-7890", "location": "New York"},
        {"name": "Organic Market", "contact": "987-654-3210", "location": "Los Angeles"}
    ]
    for vendor in vendors:
        if not db.query(Vendor).filter(Vendor.name == vendor["name"]).first():
            db.add(Vendor(**vendor))
    db.commit()

    # ✅ Check and insert products
    products = [
        {"name": "Milk (Expires Soon)", "description": "1L Fresh Milk", "price": 2.5, "expiry_date": datetime.now() + timedelta(days=2), "vendor_id": 1, "charity_eligible": True},
        {"name": "Bread", "description": "Whole Grain Bread", "price": 1.2, "expiry_date": datetime.now() + timedelta(days=5), "vendor_id": 1, "charity_eligible": False},
        {"name": "Eggs", "description": "Organic Free-Range Eggs", "price": 3.0, "expiry_date": datetime.now() + timedelta(days=3), "vendor_id": 2, "charity_eligible": True}
    ]
    for product in products:
        if not db.query(Product).filter(Product.name == product["name"]).first():
            db.add(Product(**product))
    db.commit()

    # ✅ Check and insert orders
    orders = [
        {"user_id": 1, "product_id": 1, "quantity": 2, "total_price": 5.0, "status": OrderStatusEnum.PENDING},
        {"user_id": 1, "product_id": 2, "quantity": 1, "total_price": 1.2, "status": OrderStatusEnum.COMPLETED}
    ]
    for order in orders:
        if not db.query(Order).filter(Order.user_id == order["user_id"], Order.product_id == order["product_id"]).first():
            db.add(Order(**order))
    db.commit()

    # ✅ Check and insert payments
    payments = [
        {"user_id": 1, "order_id": 1, "amount": 5.0, "status": PaymentStatusEnum.COMPLETED, "payment_method": PaymentMethodEnum.CARD},
        {"user_id": 1, "order_id": 2, "amount": 1.2, "status": PaymentStatusEnum.COMPLETED, "payment_method": PaymentMethodEnum.PAYPAL}
    ]
    for payment in payments:
        if not db.query(Payment).filter(Payment.user_id == payment["user_id"], Payment.order_id == payment["order_id"]).first():
            db.add(Payment(**payment))
    db.commit()

    # ✅ Check and insert charities
    charities = [
        {"name": "Food For All", "location": "San Francisco", "contact": "111-222-3333", "website": "foodforall.org"}
    ]
    for charity in charities:
        if not db.query(Charity).filter(Charity.name == charity["name"]).first():
            db.add(Charity(**charity))
    db.commit()

    # ✅ Check and insert donations
    donations = [
        {"user_id": 1, "charity_id": 1, "amount": 10.0, "status": PaymentStatusEnum.COMPLETED}
    ]
    for donation in donations:
        if not db.query(Donation).filter(Donation.user_id == donation["user_id"], Donation.charity_id == donation["charity_id"]).first():
            db.add(Donation(**donation))
    db.commit()

    # ✅ Check and insert notifications
    notifications = [
        {"user_id": 1, "message": "Your order has been shipped!", "read_status": False}
    ]
    for notification in notifications:
        if not db.query(Notification).filter(Notification.user_id == notification["user_id"], Notification.message == notification["message"]).first():
            db.add(Notification(**notification))
    db.commit()

    # ✅ Check and insert reviews
    reviews = [
        {"user_id": 1, "vendor_id": 1, "rating": 5, "comment": "Great quality products!"}
    ]
    for review in reviews:
        if not db.query(Review).filter(Review.user_id == review["user_id"], Review.vendor_id == review["vendor_id"]).first():
            db.add(Review(**review))
    db.commit()

    print("✅ Sample data inserted successfully!")

except Exception as e:
    print(f"❌ Error inserting sample data: {e}")
    db.rollback()

finally:
    db.close()
