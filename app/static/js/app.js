/* Add your Application JavaScript */ 
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="/"><i class="fa fa-instagram" style="font-size:24px">Photogram</i></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>  
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>  
          <li class="nav-item active">
            <router-link class="nav-link" to="/my_profile">My Profile<span class="sr-only">(current)</span></router-link>
          </li>  
          <li class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link>
          </li>  
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template:
   ` 
   <div class="d-flex justify-content-center">
    <div class="jumbotron">
        <div class="d-flex justify-content-center">
        <div class="p-2 bg"> 
        <img   src="/static/pic.jpg" alt="the most basic pic of people smiling i could find if i get copy righted oww well" class="img-thumbnail" />
        </div>
        <div class="p-2 bg">
        <h1>Photogram</h1> 
        <p>share photos of your favourite moments with friends,family and the world</p>  
        <div>
        <button id="register" class="btn btn-success" v-on:click="nextpage1" >Register</button> 
        <button id="login" class="btn btn-primary" v-on:click="nextpage2">Login</button>
        </div>
        </div>
        </div>
    </div> 
    </div>
   `,
     methods:{ 
        nextpage1:function(event){
            
           this.$router.push("/register")
        }, 
        nextpage2:function(event){ 
            this.$router.push("/login")
            
        }
    }
});  

 

const Login =Vue.component('Login',{
    template:`<!--
    <div class="d-flex justify-content-center">
    <div>
    <h2>Login</h2>
    <div class="jumbotron"> 
    <form id="loginform" action="/api/auth/login" method="POST" enctype = "multipart/form-data" @submit.prevent="loginuser">
    <div>
    <label>username</label> 
    </div>
    <div>
    <input id="username" name="username" type="text" />
    </div> 
    <div>
    <label>password</label> 
    </div> 
    <div> 
    <input id="password" name="password" type="password" />
    </div> 
    <div class="d-flex flex-column"> 
    <p></p>
    <button type="submit" name="submit" class="btn btn-success" >LOGIN</button> 
    </div>
    </form>
    </div> 
    </div> 
    </div> -->
    
    <!-- jordan stuff-->
     <div>
    <div class="page-header center">
                    <h1 class="text-center">Login</h1>      
    </div>
    <div class="d-flex justify-content-center">
                <div class="register-form cus-form-cont"">
                    <form id="loginform" action="/api/auth/login" method="POST" enctype = "multipart/form-data" @submit.prevent="loginuser">
                            <div class="form-group "  id="uploadForm">
                              <label for="exampleInputEmail1">Username</label>
                              <input type="text" class="form-control" id="username" name="username" aria-describedby="emailHelp" >
                              
                            </div>
                            <div class="form-group">
                              <label for="password">Password</label>
                              <input type="password" class="form-control"  id="password" name="password" >
                            </div>
                            
                            
                            <button type="submit" class="btn btn-success  cus-btn">Login</button>
                    </form>
                </div>
            </div>
    </div>
    `,
    created:function(){
        let self=this
    },
    data:function(){
        return {
            current_user:0
        }
    }
    ,
    methods:{ loginuser:function(){
       let self = this;
       let loginform=document.getElementById("loginform")
       let form_data = new FormData(loginform)
       fetch("/api/auth/login",{
           method: 'POST', 
                 body:form_data, 
                 headers:{ 
                     'X-CSRFToken':token
                     }, 
                    credentials:'same-origin'
             
       }) 
    
             .then(function (response){
                 return response.json();
             }) 
             .then(function(jsonResponse){
                 let information=jsonResponse
                // console.log(information);
                current_user=information
                
                self.current_user=information
                console.log(current_user)
                if(current_user.message == "you are now logged in"){ 
                    console.log("in here")
                     self.$router.push("/explore")
                     }
             })
             .catch(function(error){
                console.log(error) 
             });
   } 
   
       
   }
})

const newpost= Vue.component('newpost',{
    template:`<!--
    <div class="d-flex justify-content-center"> 
    <div> 
    <h2>New Post</h2> 
    <FlashMessage></FlashMessage>
    <div class="jumbotron"> 
    <form id="postform" name="postform" action="/api/users/user_id/posts" method="POST" enctype = "multipart/form-data" @submit.prevent="newpost"> 
    <p>Photo</p>
    <input id="photo" type="file" name="photo" accept="image/*">
    
    <div class="d-flex flex-column">
    <p>Caption</p>
    <textarea id="caption" name="caption" ></textarea> 
    </div>
    <div class="d-flex flex-column"> 
    <p></p>
    <button type="submit" name="submit" class="btn btn-primary">POST</button> 
    </div> 
    </form>
    </div>
    </div>
    
    </div> -->
    <!-- jordan stuff -->
     <div>
                            <div class="page-header center">
                                            <h1 class="text-center">New Post</h1>      
                            </div>
                            <div class="d-flex justify-content-center">
                                        <div class="register-form cus-form-cont">
                                            <form  id="postform" name="postform" action="/api/users/user_id/posts" method="POST" enctype = "multipart/form-data" @submit.prevent="newpost">
                                                    <div class="form-group " enctype="multipart/form-data" id="uploadForm">
                                                      <label for="exampleInputEmail1">Photo</label>
                                                      <input type="file" class="form-control" id="photo" name="photo" accept="image/*" aria-describedby="emailHelp" >
                                                      
                                                    </div>
                                                    <div class="form-group">
                                                            <label for="bio">Biography</label>
                                                            <textarea class="form-control"  id="caption" name="caption" rows="3"></textarea>
                                                    </div>
                                                    
                                                    
                                                    <button type="submit" class="btn btn-success  cus-btn">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                            </div>
    `,
    data:function(){
        return{
            user_id:0
        }
    },
    methods:{newpost:function(){ 
        let self = this; 
        let postform=document.getElementById("postform");
        let form_data = new FormData(postform);
        fetch("/api/users/user_id/posts",{
            method: 'POST', 
                 body:form_data, 
                 headers:{ 
                     'X-CSRFToken':token
                     }, 
                    credentials:'same-origin'
            
        })
        .then(function (response){
        return response.json();
             }) 
             .then(function(jsonResponse){ 
                 console.log("close");
                 let information=jsonResponse
                //  console.log(information.message); 
                 if (information.message == "the post was made sucess fully"){
                     console.log("in here")
                    self.$router.push("/explore") 
                    //this.flashMessage.show({status: 'error', title: 'Error Message Title', message: 'Oh, you broke my heart! Shame on you!'})
                 }
                 
                 
             })
             .catch(function(error){
                console.log(error) 
             });
   }
       
   }
}) ;
const logout=Vue.component('logout',{
    template:`
    <div class="d-flex justify-content-center"> 
    <div class="d-flex flex-column">
    <h2 class="p-2 bg">logout</h2> 
    <div class="p-2 bg">
    <div class="jumbotron">
    <p>{{message}}</p>
    </div>
    </div> 
    </div> 
    </div>
    `,
    
    created:function(){
        let self=this 
        fetch('/api/auth/logout') 
        .then(function(response){
            return response.json();
        }) 
        .then(function(data){
            console.log(data);
            self.message=data.message
        });
    },
    
    data:function(){
        return{
            message:''
        }
    }
})

const register=Vue.component('register',{
    template:`
    <div class="d-flex justify-content-center"> 
    <div>
    <h2>Register</h2>
    <div class="jumbotron"> 
    <form id="registerform" action="/api/users/register" method="POST" enctype = "multipart/form-data" @submit.prevent="registerperson"> 
    <div>
    <label>Username</label> 
    </div>
    <div>
    <input type="text" id ="username" name="username" />
    </div>
    <div>
    <label>Password</label> 
    </div> 
    <div>
    <input type="password" id ="password" name="password" /> 
    </div> 
    <div>
    <label>Firstname</label> 
    </div> 
    <div>
    <input type="text" id ="firstname" name="firstname" /> 
    </div> 
    <div>
    <label>Lastname</label> 
    </div> 
    <div>
    <input type="text" id ="lastname" name="lastname" /> 
    </div> 
    <div>
    <label>Email</label> 
    </div> 
    <div>
    <input type="text" id ="email" name="email" /> 
    </div> 
    <div>
    <label>Location</label> 
    </div> 
    <div>
    <input type="text" id ="location" name="location" /> 
    </div> 
    <div>
    <label>Biography</label> 
    </div> 
    <div>
     <textarea id="biography" name="biography" ></textarea> 
    </div> 
    <div> 
    <label>Photo</label>
    </div> 
    <div> 
    <input id="profile_picture" type="file" name="profile_picture" accept="image/*">
    </div> 
    <div class="d-flex flex-column"> 
    <p></p>
    <button type="submit" name="submit" class="btn btn-success">REGISTER</button> 
    </div>
    </form>
    </div> 
    </div>
    </div>
    `,
    methods:{ 
        registerperson:function(){
            let self=this
            let registerform= document.getElementById("registerform") 
            let form_date = new FormData(registerform) 
             fetch("/api/users/register",{
                 method: 'POST', 
                 body:form_date, 
                 headers:{ 
                     'X-CSRFToken':token
                     }, 
                    credentials:'same-origin'
             }) 
             .then(function (response){
                 return response.json();
             }) 
             .then(function(jsonResponse){
                 let information=jsonResponse
                 console.log(information); 
                // this.$router.push("/") 
                //console.log(current_user) 
                console.log("in here")
                self.$router.push("/login")
             })
             .catch(function(error){
                console.log(error) 
             });
        }
    }
}) 

const explore=Vue.component('explore',{
    template:` 
   
    <!-- jordan stuff -->
    
     <div class="d-flex justify-content-center">
                <div class="left-section">
                        <div class="card posts"  v-for="(i,index) in posts"  :key="index">
                               <div class="top " v-on:click="profile(index)">
                                    <p class="text-muted lead" v-on:click="profile(index)"> 
                                        <div v-on:click="profile(index)" class="post-header-of-username"> <img class=".img-circle" v-bind:src="'/static/uploads/' + i.pp" alt=""  > </div> 
                                        <span>{{ i.username }}</span>
                                    </p>
                               </div>
                               <div class="middle">
                                <img :src="'static/photos/' + i.photo " alt="">
                               </div>
                               <div class="bottom">
                                    <p id="caption" :value=i.caption>{{ i.caption}}</p>
                               </div>
                               <div >
                                    <div class="row">
                                        <div class="text-muted lead col" > 
                                                <div  v-on:click="like_post(index)" class="post-header-of-username" id="liker"> <img src="static/images/like.png"  alt=""> </div> 
                                                {{ i.likes }} likes
                                        </div>
                                        <div class="col">
                                            <p >
                                                {{i.created_on}} {{index}}
                                            </p>
                                        </div>
                                    </div>
                               </div>
                         </div>
                </div>
                <div class="right-section">
                    <button id="upload" class="btn btn-primary" v-on:click="nextpage1" >New Post</button>
                </div>
            </div>
        `,data:function(){ 
            let self= this
            return{
                
            posts:[], 
            post_id:0
            
        }},
        created:function(){ 
            let self=this
            fetch("/api/post")
        .then(function(response){
            return response.json();
        }) 
        .then(function(data){
            console.log(data); 
            self.posts=data.posts
            
        });
        },
         methods:{ 
        
        nextpage1:function(event){
           let self=this 
           this.$router.push("/posts/new")
        },
        like_post:function(index){ 
            let self=this
            console.log(index)
           let post_id=this.posts[index].id 
           fetch("/api/posts/"+post_id+"/like",{
                 method: 'POST', 
                 headers:{ 
                     'X-CSRFToken':token
                     }, 
                    credentials:'same-origin'
             }) 
             .then(function (response){
                 return response.json();
             }) 
             .then(function(jsonResponse){
                 let information=jsonResponse
                 console.log(information); 
                  self.posts[index].likes= information.likes;
               
             })
             .catch(function(error){
                console.log(error) 
             });
             
             },
             profile:function(index){ 
                  let self=this 
                 let user_id=this.posts[index].user_id
                 self.$router.push("/users/"+user_id)
                 
             }
             
         }
        
})
 
 const my_profile =Vue.component('my_profile',{
     template:`
     
     <div>
    <div class="d-flex justify-content-center m-3">
                        <div class="card p-3 personal-card " >
    
                            <div class="personal-flex">
                                <div class="personal-pic">
                                    <img v-bind:src="'/static/uploads/' + user_info.profile_picture" alt="">
                                </div>
                                <div>
                                    <h3 >{{user_info.firstname}} {{user_info.lastname}}</h3>
                                    <p>member since {{user_info.join_on}}.</p>
                                    <p> {{ user_info.location }}</p>
                                    <p> {{user_info.biography}}  </p>
        
                                </div>
                                <div >
                                   <!--<div class="d-flex justify-content-center " >
                                        <div class="m-2 d-flex justify-content-center flex-column">
                                            <p class="text-center">6</p>
                                            <p class="text-muted">Post</p>
                                        </div>
                                        <div class="m-2 d-flex justify-content-center flex-column">
                                            <p class="text-center">{{user_info.followers}}</p>
                                            <p class="text-muted">followers</p>
                                        </div>
                                    </div>-->
                                    
                                </div>
                            </div>
    
                        </div>
                    </div>
                <div class="grid m-3" >
        
            
                    <div class="wrap" v-for= "i in pics">
                         <img class="imgs" v-bind:src="'/static/photos/' + i.pic" />
                     </div>
            
        
                </div>
        </div>
    
     `,
     created:function(){
         let self=this 
         fetch("/api/current_user")
         .then(function(response){
             return response.json();
         }) 
         .then(function(data){
             console.log(data)
             self.user_info=data 
             self.pics=data.photos
         })
         
     }, 
     
     data:function(){
         let self= this
         return{
             user_info:{},
             pics:[]
         }
     }
 }) 
 const profile =Vue.component('profile',{
     template:` <!--
     <div>
     <div class="d-flex justify-content-center">
     <div class="jumbotron">
     <div class="d-flex justify-content-center">
        <div class="p-2 bg"> 
        <img class="img-thumbnail" v-bind:src="'../static/uploads/' + user_info.profile_picture" style="width:250px;height:250px;"/>
        </div>
        <div class="p-2 bg">
        <h5>{{user_info.firstname}} {{user_info.lastname}}</h5>
        <p>member since {{user_info.joined_on}}</p>
        <p>{{user_info.biography}} </p>
        <p>followers:{{user_info.followers}}</p>
        <button id="follow" class="btn btn-primary" v-on:click="follow" >Follow</button>
        </div> 
        
        </div> 
        <div v-for= "i in posts" class="card">
        <img  class="card-img-top" v-bind:src="'../static/photos/' + i.pic"/>
        
        </div> 
        
        
        </div>
        
     </div>
     
     
            <div class="grid" >
        
            
               <div class="wrap" v-for= "i in posts">
                  <img class="imgs" v-bind:src="'../static/photos/' + i.pic" />
               </div>
            
        
            </div>
    </div> -->
    
   
    <div>
    <div class="d-flex justify-content-center m-3">
                        <div class="card p-3 personal-card " >
    
                            <div class="personal-flex">
                                <div class="personal-pic">
                                    <img v-bind:src="'../static/uploads/' + user_info.profile_picture" alt="">
                                </div>
                                <div>
                                    <h3 >{{user_info.firstname}} {{user_info.lastname}}</h3>
                                    <p>member since {{user_info.joined_on}}.</p>
                                    <p> {{ user_info.location }}</p>
                                    <p> {{user_info.biography}}  </p>
        
                                </div>
                                <div >
                                    <div class="d-flex justify-content-center " >
                                        <div class="m-2 d-flex justify-content-center flex-column">
                                            <p class="text-center">{{total}}</p>
                                            <p class="text-muted">Post</p>
                                        </div>
                                        <div class="m-2 d-flex justify-content-center flex-column">
                                            <p class="text-center">{{user_info.followers}}</p>
                                            <p class="text-muted">followers</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary px-5" v-bind:class="{ 'btn-primary' :true, 'btn-success': follower }" v-on:click="follow" >{{ followtext  }}</button>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                <div class="grid m-3" >
        
            
                    <div class="wrap" v-for= "i in posts">
                         <img class="imgs" v-bind:src="'../static/photos/' + i.pic" />
                     </div>
            
        
                </div>
        </div>
      
     `,
     data:function(){
         return{
             id:this.$route.params.user_id,
             user_info:{},
             posts:[],
             follower: false,
             followtext: 'Follow', 
             total:0
             
         }
     },
     created:function(){
         let self=this 
         fetch("/api/users/"+this.id+"/posts")
         .then(function(response){
             return response.json();
         }) 
         .then(function(data){
             console.log(data) 
             self.posts=data.posts 
             self.total=self.posts.length;
             
         })
         
         fetch("/api/userinfo/"+this.id) 
         .then(function(response){
             return response.json();
         }) 
         .then(function(data2){
             console.log(data2) 
             self.user_info=data2
             
         })
         
         
     },
     methods:{ 
         follow:function(){
            let self=this  ;
            
           fetch("/api/users/"+self.id+"/follow",{
                 method: 'POST', 
                 headers:{ 
                     'X-CSRFToken':token
                     }, 
                    credentials:'same-origin'
             }) 
             .then(function (response){
                 return response.json();
             }) 
             .then(function(jsonResponse){
                 let information=jsonResponse
                 console.log(information)
                 self.follower = true;
                 self.followtext = 'Following';
                 
                 self.user_info.followers=information.followers 
                 let change="green"
                 document.getElementById('follow').classList.add(change);
                 
                  
               
             })
             .catch(function(error){
                console.log(error) 
             })
         }
         
     }
 })

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
}) ; 




// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        {path:"/posts/new",component:newpost}, 
        {path:"/register",component:register},
        {path:"/login",component:Login},
        {path:"/logout",component:logout},
        {path:"/explore",component:explore}, 
        {path:"/my_profile",component:my_profile},
        {path:"/users/:user_id",component:profile},
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound} 
        
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router,
    data:{
        current_user:""
    }
});