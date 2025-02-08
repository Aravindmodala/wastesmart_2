from sqlalchemy.orm import Session
from models import Notification, User
from schemas import NotificationCreate, NotificationUpdate  
from datetime import datetime

def create_notification(db: Session, notification: NotificationCreate):
    """Creates a new notification only if user exists."""
    # ✅ Check if user exists
    user = db.query(User).filter(User.id == notification.user_id).first()
    if not user:
        return {"error": "User not found"}

    db_notification = Notification(
        user_id=notification.user_id,
        message=notification.message
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def get_notifications(db: Session, user_id: int):
    """Fetches all notifications for a specific user."""
    notifications = db.query(Notification).filter(Notification.user_id == user_id).all()
    return [
        {
            "id": n.id,
            "user_id": n.user_id,
            "message": n.message,
            "read_status": n.read_status,
            "created_at": n.created_at.strftime("%Y-%m-%d %H:%M:%S") if n.created_at else "N/A"
        }
        for n in notifications
    ]

def mark_notification_as_read(db: Session, notification_id: int):
    """Marks a notification as read."""
    db_notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not db_notification:
        return None

    db_notification.read_status = True  # ✅ Mark as read
    db.commit()
    db.refresh(db_notification)
    return db_notification

def delete_notification(db: Session, notification_id: int):
    """Deletes a notification."""
    db_notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if db_notification:
        db.delete(db_notification)
        db.commit()
    return db_notification

