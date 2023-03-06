from app.models import db, Coffee


def seed_coffees():
    coffee_1 = Coffee(
        id=1,
        name="Black",
        year=1671,
        caffeine_content=12.0,
    )

    coffee_2 = Coffee(
        id=2,
        name="Espresso",
        year=1906,
        caffeine_content=64.0,
    )

    coffee_3 = Coffee(
        id=3,
        name="Latte",
        year=1950,
        caffeine_content=64.0
    )

    db.session.add(coffee_1)
    db.session.add(coffee_2)
    db.session.add(coffee_3)
    db.session.commit()


def undo_coffees():
    db.session.execute('DELETE FROM coffees')
    db.session.commit()
