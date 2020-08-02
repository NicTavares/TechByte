const express= require('express');
const path = require('path');
const mongoose = require('mongoose');
const blogPost = require('./models/blogpost.js');
const app = new express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
//const validateMiddleware = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authenticationMiddleware');
const redirectIfAuthenticationMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutcontroller = require('./controllers/logout');
const flash = require('connect-flash');
const commentController = require('./controllers/comment');

global.loggedIn = null;

app.use(flash());
//app.use('/posts/store', validateMiddleware);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(express.static('public'));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})



mongoose.connect('mongodb+srv://Nic:2338434Ben@cluster0.vyejv.mongodb.net/TechByte', {useNewUrlParser: true});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 4000;
}
app.listen(port, () => {
    console.log('App Listening');
});

app.get('/', homeController); //retrieves the home page

app.get('/post/:id', getPostController); //retrieves a specific post for viewing

app.get('/posts/new', authMiddleware, newPostController); //retireves the new post interface for creating a new blog post

app.post('/posts/store', authMiddleware, storePostController); //stores a new post in the DB

app.get('/auth/register', redirectIfAuthenticationMiddleware, newUserController); //retrieves the page for creating a new user

app.post('/users/register', redirectIfAuthenticationMiddleware, storeUserController); //stores a new user in the DB

app.get('/auth/login', redirectIfAuthenticationMiddleware, loginController); //retireves the login page

app.post('/users/login', redirectIfAuthenticationMiddleware, loginUserController); //allows the user to login

app.get('/auth/logout', logoutcontroller); //lets user logout

app.post('/comment/store', commentController); //stores comments


app.use((req, res) => {
    res.render('notfound');
});
