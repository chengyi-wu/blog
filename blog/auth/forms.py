from flask_wtf import FlaskForm
from wtforms.fields import StringField, PasswordField, BooleanField, SubmitField
#from flask_wtf.html5 import URLField
from wtforms.validators import DataRequired, url

class LoginForm(FlaskForm):
    username = StringField('UserName:', validators=[DataRequired()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')