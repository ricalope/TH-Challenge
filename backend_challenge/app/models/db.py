import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
environment = os.getenv("FLASK_ENV")
