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
const validateMiddleware = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authenticationMiddleware');
const redirectIfAuthenticationMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutcontroller = require('./controllers/logout');

global.loggedIn = null;

app.use('/posts/store', validateMiddleware);
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



mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

app.listen(4000, () => {
    console.log('App started on port 4000');
});

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', authMiddleware, newPostController);

app.post('/posts/store', authMiddleware, storePostController);

app.get('/auth/register', redirectIfAuthenticationMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticationMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticationMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticationMiddleware, loginUserController);

app.get('/auth/logout', logoutcontroller);


app.use((req, res) => {
    res.render('notfound');
});
