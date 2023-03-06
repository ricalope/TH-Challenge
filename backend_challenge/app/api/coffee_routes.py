from flask import Blueprint, jsonify, request
from app.models import db, Coffee
from app.forms import CoffeeForm


coffee_routes = Blueprint('coffees', __name__)


@coffee_routes.route('/ping')
def get_coffee_ping():
    return { "status": "good" }


@coffee_routes.route('')
def get_coffees():
    coffees = Coffee.query.all()
    result = []
    for coffee in coffees:
        c_dict = coffee.to_dict()
        result.append(c_dict)
    return jsonify(result)


@coffee_routes.route('/<int:id>')
def get_coffee_by_id(id):
    coffee = Coffee.query.get(id)
    if not coffee:
        return { "message": "coffee not found" }, 404
    return coffee.to_dict()


@coffee_routes.route('/create', methods=["POST"])
def post_new_coffee():
    form = CoffeeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        coffee = Coffee(
            name = form.data['name'],
            year = form.data['year'],
            caffeine_content = form.data['caffeine_content'],
        )
        db.session.add(coffee)
        db.session.commit()
        return coffee.to_dict()
    return { "ERROR": form.errors }, 400


@coffee_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_coffee_by_id(id):
    coffee = Coffee.query.get(id)
    if not coffee:
        return { "message": "coffee not found" }, 404
    db.session.delete(coffee)
    db.session.commit()
    return { "message": "sucessfully deleted" }
