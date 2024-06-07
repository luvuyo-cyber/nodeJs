const express = require('express'),
    app = new express(),
    path = require('path'),
    ejs = require('ejs'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser:
        true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.listen(4000, () => {
    console.log('App listening on port 4000')
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post', (req, res) => {
    res.render('post');
});
