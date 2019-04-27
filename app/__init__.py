from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask import Flask 
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = "thisisasecret"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://tdteptwqqjgigc:885f5564741920fdba64217252fdabaf4ef0c4adf83aa42e272c602de5536dad@ec2-50-17-227-28.compute-1.amazonaws.com:5432/dftfpevotife6c"  #this is what will give acess to the database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # added just to suppress a warning 
app.config['UPLOAD_FOLDER']="./app/static/uploads"#this is where the profile pictures will be uploaded 
app.config['PHOTOS']="./app/static/photos"#this is where the potho that are posted will go 

db = SQLAlchemy(app)
#login mangement 
login_maneger=LoginManager() 
login_maneger.init_app(app)

login_maneger.login_view='login'


app.config.from_object(__name__) 

from app import views 
