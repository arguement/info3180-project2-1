from . import db 

class posts(db.Model):
    __tablename__="posts" 
    
    id = db.Column(db.Integer, primary_key=True) 
    user_id=db.Column(db.Integer)
    photo=db.Column(db.String(80))
    caption=db.Column(db.String(140))
    created_on=db.Column(db.Date) 
    
    def __init__(self,user_id,photo,caption,created_on):
        self.user_id=user_id
        self.photo=photo 
        self.caption=caption
        self.created_on=created_on  

class users(db.Model):
    __tablename__="users"
    
    id=db.column(db.Integer,primary_Key=True)
    username=db.column(db.String(80))
    password=db.column(db.String(250))
    firstname=db.column(db.String(100))
    lastname=db.column(db.String(100))
    email=db.Column(db.String(80))
    location=db.Column(db.String(80))
    biography=db.Column(db.String(2000)) 
    profile_picture=db.Column(db.String(100)) 
    
    def __init__(self, username,password,firstname, lastname, email, location, biography, profile_picture):
        self.username=username
        self.password=password
        self.first_name = firstname 
        self.last_name = lastname 
        self.email = email 
        self.location = location 
        self.biography = biography 
        self.profile_picture = profile_picture 

class likes(db.Model):
    __tablename__="likes"
    id=db.column(db.Integer,primary_key=True)
    user_id=db.column(db.Integer)
    post_id=db.column(db.Integer)
     
    def __init__(self,user_id,Follower_id):
        self.user_id=user_id
        self.post_id=post_id  



class Followers(db.Model): 
    __tablename__="followers"
    id=db.column(db.Integer,primary_key=True)
    user_id=db.column(db.Integer)
    follower_id=db.column(db.Integer)
     
    def __init__(self,user_id,Follower_id):
        self.user_id=user_id
        self.follower_id=post_id  
