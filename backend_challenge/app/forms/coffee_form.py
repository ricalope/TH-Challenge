from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DecimalField


class CoffeeForm(FlaskForm):
    name = StringField("Name")
    year = IntegerField("Year")
    caffeine_content = DecimalField("Caffeine Content")
