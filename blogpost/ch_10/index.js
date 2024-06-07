const express = require('express'),
    app = new express(),
    path = require('path'),
    ejs = require('ejs'),
    fileUpload = require('express-fileupload'),
    mongoose = require('mongoose'),
    BlogPost = require('./models/BlogPost.js'),
    newPostController = require('./controllers/newPost'),
    homeController = require('./controllers/home'),
    storePostController = require('./controllers/storePost'),
    getPostController = require('./controllers/getPost'),
    validateMiddleWare = require('./middleware/validateMiddleware.js'),
    newUserController = require('./controllers/newUser'),
    storeUserController = require('./controllers/storeUser'),
    loginController = require('./controllers/login'),
    loginUserController = require('./controllers/loginUser');

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser:
        true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);


app.listen(4000, () => {
    console.log('App listening on port 4000')
});

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);

app.get('/auth/register', newUserController);

app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController);