const express = require('express');

const port = 9000;

const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");

const db = require('./config/db');
const session = require('express-session');  
const passport = require('passport');
const passportLocal = require('./config/passportlocal');

app.use(session({
    secret: 'dev',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/', require('./Routes/indexroutes'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log("server is runing", port);
});