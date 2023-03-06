from flask import Blueprint, jsonify, request
from app.models import db, Post, Coffee
from app.forms import PostForm


post_routes = Blueprint("posts", __name__)


@post_routes.route('/ping')
def get_post_ping():
    return { "status": "good" }


@post_routes.route('')
def get_all_posts():
    posts = Post.query.all()
    result = []
    for post in posts:
        p_dict = post.to_dict()
        result.append(p_dict)
    return jsonify(result)


@post_routes.route('/<int:id>')
def get_post_by_id(id):
    post = Post.query.get(id)
    if not post:
        return { "message": "post not found" }, 404
    return post.to_dict()


@post_routes.route('', methods=["POST"])
def post_new_post():
    form = PostForm()
    print('<<<<FORM TOKEN>>>>', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            title = form.data['title'],
            coffee = form.data['coffee'],
            text = form.data['text'],
            rating = form.data['rating']
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return { "ERRORS": form.errors }, 400


@post_routes.route('/<int:id>', methods=["DELETE"])
def delete_post_by_id(id):
    post = Post.query.get(id)
    if not post:
        return { "message": "post not found" }, 404
    db.session.delete(post)
    db.session.commit()
    return { "message": "successfully deleted" }

