import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from .models import db
from .config import Config
from .api.coffee_routes import coffee_routes
from .api.post_routes import post_routes
from .seeds import seed_commands

app = Flask(__name__)
app.cli.add_command(seed_commands)
app.config.from_object(Config)
app.register_blueprint(coffee_routes, url_prefix="/api/coffee")
app.register_blueprint(post_routes, url_prefix="/api/post")
db.init_app(app)
Migrate(app,db)

CORS(app)

@app.route('/')
def get_token():
    return { "message": f"{app.config}" }

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')
