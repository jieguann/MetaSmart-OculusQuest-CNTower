
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');
const dbUrl = 'mongodb://localhost/'
const user = require('./user');
const character = require('./character');
const bodyParser = require('body-parser');

mongoose.connect(dbUrl).catch(err => {
    console.log("OH NO mongo ERROR!!!!")
    console.log(err)
});

const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret: 'Meta Go',
    touchAfter: 24 * 60 * 60
});

store.on('error', () => {
    console.log('session errors', e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'Meta Go',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


passport.use(new LocalStrategy(user.User.authenticate()));

passport.serializeUser(user.User.serializeUser());
passport.deserializeUser(user.User.deserializeUser());





app.use(session(sessionConfig))

//authentication
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user;

    next();
})

app.use('/', user.Routes);
app.use('/character', character.Routes);



app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    // console.log(err,req,res);
    res.status(statusCode).send('err');
})


const port = 3000;

app.listen(port, function () {
    console.log("Server started...");
});
