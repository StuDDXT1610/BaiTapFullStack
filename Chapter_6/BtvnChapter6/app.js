const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require('./routes/home')
const aboutRouter = require('./routes/about')
const postRouter = require('./routes/post')
const contactRouter = require('./routes/contact')
app.set("port", process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index.html', function (req, res) {
    res.redirect('/')
})
app.get('/about.html', function (req, res) {
    res.redirect('/about')
})
app.get('/contact.html', function (req, res) {
    res.redirect('/contact')
})
app.get('/post.html', function (req, res) {
    res.redirect('/post')
})

app.use('/', indexRouter);

app.use('/about', aboutRouter);
app.use('/post', postRouter);
app.use('/contact', contactRouter);
module.exports = app;