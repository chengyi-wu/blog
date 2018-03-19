from flask import redirect, url_for, request, json, abort
from flask_login import login_required
from ..models import User, BlogPost
from .. import login_manager, db

from . import api

@login_manager.user_loader
def load_user(userid):
    return User.query.get(int(userid))

@api.route('/posts/<int:id>')
def get_posts(id):
    p = BlogPost.get_by_id(id)
    if p is not None:
        return json.jsonify({
            'id' : p.id,
            'title' : p.title,
            'body' : p.body,
            'user' : {
                'id' : p.user.id,
                'username' : p.user.username
            },
            'date' : p.date,
        })
    abort(404)

@api.route('/posts/add', methods=['POST'])
@login_required
def add_post():
    u = User.query.get(1)
    data = request.json
    p = BlogPost(user=u, title=data['title'], body=data['body'])
    db.session.add(p)
    db.session.flush()
    db.session.commit()
    #print(p.id)
    return str(p.id)


@api.route('/posts/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    #print(id)
    p = BlogPost.query.get(int(id))
    if p is None:
        abort(404)
    db.session.delete(p)
    db.session.commit()
    return json.jsonify({
            'id' : p.id,
            'title' : p.title,
            'body' : p.body,
            'date' : p.date,
        })
