from .db import db
from datetime import datetime

class Post(db.Model):
    __tablename__="posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    coffee = db.Column(db.Integer, db.ForeignKey("coffees.id"))
    text = db.Column(db.Text)
    rating = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    coffee_post = db.relationship("Coffee", back_populates="post_coffee")

    def set_updated(self):
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "coffee": self.coffee,
            "text": self.text,
            "rating": self.rating,
            "caffeine": self.coffee_post.caffeine_content,
            "coffee_name": self.coffee_post.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
