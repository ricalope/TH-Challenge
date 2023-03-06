from .db import db
from datetime import datetime

class Coffee(db.Model):
    __tablename__="coffees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    year = db.Column(db.Integer)
    caffeine_content = db.Column(db.Float)
    caffeine_percentage = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    post_coffee = db.relationship("Post", back_populates="coffee_post", cascade="all, delete-orphan")

    def set_updated(self):
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "year": self.year,
            "caffeine_content": self.caffeine_content,
            "caffeine_percentage": (self.caffeine_content / 28350) * 100,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
