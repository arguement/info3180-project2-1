/* Add your Application JavaScript */ 
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="/">Photogram</a>
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
        <p>share your photos here soyou can hype on how much of a basic bitch you are cool</p>  
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
    template:`
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
    <button type="submit" name="submit" class="btn btn-success">LOGIN</button> 
    </div>
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
                console.log(information.user_id)
                self.current_user=information.user_id 
                console.log(self.current_user)
             })
             .catch(function(error){
                console.log(error) 
             });
   }
       
   }
})

const newpost= Vue.component('newpost',{
    template:`
    <div class="d-flex justify-content-center"> 
    <div> 
    <h2>New Post</h2> 
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
                 let information=jsonResponse
                 console.log(information);
                 
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
    <h2>logout</h2> 
    <div class="jumbotron">
    <p>{{message}}</p>
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
                console.log(current_user)
             })
             .catch(function(error){
                console.log(error) 
             });
        }
    }
}) 

const explore=Vue.component('explore',{
    template:` 
    <div class="d-flex justify-content-center"> 
    <div class="row">
    <div class=".col-lg-">
    
    <div v-for="i in posts" class="jumbotron">
    <img  class="img-fluid" v-bind:src="'static/photos/' + i.photo"/>
    <p> {{ i.caption}}</p>
    <p>{{i.created_on}}</p>
    </div>
     
    </div> 
    <div class=".col-lg-"> 
    <button id="upload" class="btn btn-primary" v-on:click="nextpage1" >New Post</button>
    </div> 
    </div>
    </div>
        `,data:function(){ 
            let self= this
            return{
                
            posts:[]
            
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
            
           this.$router.push("/posts/new")
        }
             
         }
})
 
 const my_profile =Vue.component('my_profile',{
     template:`
     <div class="d-flex justify-content-center">
     <div class="jumbotron">
     <div class="d-flex justify-content-center">
        <div class="p-2 bg"> 
        <img class="rounded" v-bind:src="'static/uploads/' + user_info.profile_picture"/>
        </div>
        <div class="p-2 bg">
        <h5>{{user_info.firstname}} {{user_info.lastname}}</h5>
        <p>member since</p>
        <p>{{user_info.biography}}</p>  
        <div>
        <button id="register" class="btn btn-success" >Follow</button> 
        
        </div>
        </div>
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
         })
         
     },
     data:function(){
         let self= this
         return{
             user_info:{}
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