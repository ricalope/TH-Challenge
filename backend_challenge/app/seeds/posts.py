from app.models import db, Post
from datetime import datetime


def seed_posts():
    post_1 = Post(
        id=1,
        title="The First Cup",
        coffee=1,
        text="I can't quite remember what it was, but it was made by Ann, I loved it because of that.",
        rating=5.0,
        created_at=datetime(2023, 3, 3, 12, 00, 00)
    )

    post_2 = Post(
        id=2,
        title="The Second Cup",
        coffee=2,
        text="She always makes the best coffee, I don't think there is any other like it.",
        rating=4.0,
        created_at=datetime(2023, 3, 4, 12, 00, 00)
    )

    post_3 = Post(
        id=3,
        title="The Third Cup",
        coffee=3,
        text="Ann made me a latte, this time with honey and cinnamon. She always puts so much of herself into the coffee she makes.",
        rating=5.0,
        created_at=datetime(2023, 3, 5, 12, 00, 00)
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.commit()


def undo_posts():
    db.session.execute('DELETE FROM posts')
    db.session.commit()
