from flask import Flask, Blueprint
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_moment import Moment
from flask_debugtoolbar import DebugToolbarExtension
# from flask_webpack import Webpack
# from flask_babel import Babel
# from flask_cache import Cache

from blog.config import config_by_name

db = SQLAlchemy()

login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = "auth.login"

moment = Moment()

toolbar = DebugToolbarExtension()

#cache = Cache()
# babel = Babel()
# webpack = Webpack()

def create_app(config_name):
    print(config_name)
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    login_manager.init_app(app)
    moment.init_app(app)
    toolbar.init_app(app)
    # babel.init_app(app)
    # webpack.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .posts import posts as posts_blueprint
    app.register_blueprint(posts_blueprint, url_prefix='/posts')

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app


#
