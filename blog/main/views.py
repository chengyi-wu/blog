from flask import Flask, render_template, url_for, request,redirect,flash
from . import main
from .. import login_manager
from ..models import User, BlogPost

@login_manager.user_loader
def load_user(userid):
    return User.query.get(int(userid))

@main.route('/')
@main.route('/index')
def index():
    return render_template('index.html', new_blogposts=BlogPost.newest(5))

@main.route('/aboutme')
def aboutme():
    return "<h1>TODO:ABOUT ME</h1>"

@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@main.app_errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500