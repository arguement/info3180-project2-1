from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask import Flask 
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = "thisisasecret"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:password123@localhost/project2"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # added just to suppress a warning 
app.config['UPLOAD_FOLDER']="./app/static/uploads"

db = SQLAlchemy(app)



app.config.from_object(__name__) 

from app import views