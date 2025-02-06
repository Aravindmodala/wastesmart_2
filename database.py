from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# PostgreSQL Connection URL
DATABASE_URL = "postgresql://postgres:1308@localhost:5432/wastesmart"

print("Connecting to database...")

# Create Engine
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define Base (Moved here to avoid circular imports)
Base = declarative_base()

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Import models AFTER defining Base
from models import *

# Create All Tables from models.py
if __name__ == "__main__":
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")
