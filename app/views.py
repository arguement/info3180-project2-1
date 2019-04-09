from app import app, db, login_maneger 
from datetime import date
from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from app.forms import loginform
from app.models import *
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename 
from werkzeug.security import generate_password_hash
from app.forms import registerform
import psycopg2 
import random 
import os   
import json 
from werkzeug.utils import secure_filename 
from flask_login import LoginManager

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages



@app.route('/api/users/register',methods=['POST']) 
def register(): 
    form=registerform() 
    if request.method == 'POST' : 
        username=request.form['username']
        password=(request.form['password']) 
        password=generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
        firstname=request.form['firstname']
        lastname=request.form['lastname']
        email=request.form['email']
        location=request.form['location']
        biography=request.form['biography']
        profile_picture=form.profile_picture.data 
        filename=secure_filename(profile_picture.filename)
        profile_picture.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        join_on=date.today()
        newuser=users(username,password,firstname,lastname,email,location,biography,filename,join_on)
        db.session.add(newuser)
        db.session.commit() 
        return jsonify({"message": "new user success fully made","password":password,"biography":biography})  
    
    
    errors=form_errors(form) 
    return jsonify({"errors":errors})


@app.route('/api/auth/login',methods=['POST'])
def login():
    form=loginform 
    if request.method=='POST' :
        username=request.form['username']
        password=request.form['password']  
        
        user=users.query.filter_by(username=username).first() 
        
        if user != None and check_password_hash(user.password, password):
            login_user(user)
            print(current_user.is_authenticated)
            return jsonify({"message":"you are now logged in","user_id":user.id,"usersame":user.username})
        return jsonify({"message":"invalid password and/or username"})  
    
    errors=form_errors(form) 
    return jsonify({"errors":errors})

@app.route('/api/auth/logout')

@login_required 
def logout():
    logout_user 
    return jsonify({'message':"you are now logged out"}) 
    

app.route('/api/users/{user_id}/posts',methods=['POST'])
def newpost(user_id):
    form=newpost 
    if request.method=='POST' and form.validate_on_submit():
        caption=request.form['caption']
        
    
@login_maneger.user_loader 
def load_user(user_id):
    return users.query.get(user_id)