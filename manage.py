from flask_script import Manager, prompt_bool
from blog import db, create_app
from blog.models import User, BlogPost
import os

app = create_app(os.environ.get("BUILD_FLAVOR") or 'dev')
manager = Manager(app)

@manager.command
def initdb():
    db.create_all()
    print("Initialize database")

@manager.command
def dropdb():
    if prompt_bool("Drop database?"):
        db.drop_all()
        print('Drop the db')

if __name__=='__main__':
    manager.run()
