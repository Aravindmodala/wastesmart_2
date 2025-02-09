from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.notifications import create_notification, get_notifications, mark_notification_as_read, delete_notification
from schemas import NotificationCreate, NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.post("/", response_model=NotificationResponse)
def send_notification(notification: NotificationCreate, db: Session = Depends(get_db)):
    """Sends a notification to a user."""
    return create_notification(db, notification)

@router.get("/{user_id}", response_model=list[NotificationResponse])
def list_notifications(user_id: int, db: Session = Depends(get_db)):
    """Fetch all notifications for a user."""
    return get_notifications(db, user_id)

@router.put("/{notification_id}/read", response_model=NotificationResponse)
def read_notification(notification_id: int, db: Session = Depends(get_db)):
    """Mark a notification as read."""
    updated_notification = mark_notification_as_read(db, notification_id)
    if not updated_notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return updated_notification

@router.delete("/{notification_id}")
def remove_notification(notification_id: int, db: Session = Depends(get_db)):
    """Delete a notification."""
    notification = delete_notification(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification deleted successfully"}
