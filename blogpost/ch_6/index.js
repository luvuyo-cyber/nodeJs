const express = require('express'),
    app = new express(),
    path = require('path'),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    BlogPost = require('./models/BlogPost.js');

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser:
        true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());


app.listen(4000, () => {
    console.log('App listening on port 4000')
});

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/', async (req, res) => {
//     const blogposts = await BlogPost.find({})
//     res.render('index', {
//         blogposts: blogposts
//     });
// });

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index', {
        blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// app.get('/post', (req, res) => {
//     res.render('post');
// });

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    });
});

app.get('/posts/new', (req, res) => {
    res.render('create')
});

// app.post('/posts/store', (req, res) => {
//     //model creates a new doc with browser data
//     BlogPost.create(req.body, (error, blogpost) => {
//         res.redirect('/')
//     })
// })

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
});