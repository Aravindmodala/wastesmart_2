from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserUpdate
from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ========== USER CRUD FUNCTIONS ==========

def create_user(db: Session, user: UserCreate):
    """Creates a new user with a hashed password."""
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role  # Default role: customer
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    """Fetches all users."""
    return db.query(User).all()

def get_user_by_id(db: Session, user_id: int):
    """Fetches a single user by ID."""
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    """Fetches a user by email."""
    return db.query(User).filter(User.email == email).first()

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    """Updates user details."""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None  # User not found

    if user_update.name:
        db_user.name = user_update.name
    if user_update.email:
        db_user.email = user_update.email
    if user_update.password:
        db_user.password = pwd_context.hash(user_update.password)  # Hash new password
    if user_update.role:
        db_user.role = user_update.role

    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    """Deletes a user (only if they have no active orders or donations)."""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None

    # Prevent deleting user if they have active orders or donations
    if db_user.orders or db_user.donations:
        return "User cannot be deleted as they have active transactions."

    db.delete(db_user)
    db.commit()
    return db_user
