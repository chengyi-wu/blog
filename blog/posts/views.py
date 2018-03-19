from flask import render_template, flash, redirect, url_for, request
from flask_login import login_required
from blog.models import User
from blog import login_manager, db

from . import posts

# Use JSON + RESTful
@posts.route('/add')
@login_required
def add():
    return render_template('add.html')

@posts.route('/<int:id>')
def view(id):
    return render_template('disp.html', id=id)