from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField


class PostForm(FlaskForm):
    title = StringField("Title")
    coffee = IntegerField("Coffee")
    text = StringField("Text")
    rating = FloatField("Rating")
