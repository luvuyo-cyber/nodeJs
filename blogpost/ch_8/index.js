const express = require('express'),
    app = new express(),
    path = require('path'),
    ejs = require('ejs'),
    fileUpload = require('express-fileupload'),
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
app.use(fileUpload());

const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store',validateMiddleWare);


app.listen(4000, () => {
    console.log('App listening on port 4000')
});

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

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: 'assets/img/' + image.name
        })
        res.redirect('/')
    });
});