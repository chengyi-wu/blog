from flask_script import Manager, prompt_bool
from blog import db, create_app
from blog.models import User, BlogPost
import os

app = create_app(os.environ.get("BUILD_FLAVOR") or 'dev')
manager = Manager(app)

@manager.command
def initdb():
    db.create_all()
    db.session.add(User(username="chenwu", password="Password01!"))
    
    db.session.commit()

    u = User.query.get(1)

    for s in ["test", "another one", "some more"]:
        db.session.add(BlogPost(user=u, title=s, body=s))

    db.session.commit()

    print("Initialize database")

@manager.command
def dropdb():
    if prompt_bool("Drop database?"):
        db.drop_all()
        print('Drop the db')

if __name__=='__main__':
    manager.run()
