from flask import render_template, flash, redirect, url_for, request
from flask_login import login_required, login_user, logout_user, current_user
from .forms import LoginForm
from ..models import User
from .. import login_manager, db

from . import auth

@login_manager.user_loader
def load_user(userid):
    return User.query.get(int(userid))

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.get_by_username(form.username.data)
        #app.logger.debug("UserName={}", form.username.data)
        if user is not None and user.check_password(form.password.data):
            login_user(user, form.remember_me)
            flash("Logged in successfully as {}".format(user.username))
            return redirect(request.args.get('next') or url_for('main.index'))
        flash("Incorrect username or passowrd")
    return render_template('login.html', form=form)

@auth.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main.index'))