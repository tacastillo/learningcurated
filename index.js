/**
 * Created by Timothy on 11/4/15.
 */

var express = require('express'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    url = require('./config/database.js').url,
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session')

mongoose.connect(url);

mongodb.MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(validator())
    app.use(express.static('public'))

    app.use(session({ secret: 'thisisjustatest'}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    app.use(function(req, res, next) {
        submissions = db.collection('submissions');
        return next();
    });

    app.use(function(req, res, next) {
        categories = db.collection('categories');
        return next();
    });

    require('./app/routes.js')(app, passport);
    require('./config/passport')(passport);
});

app.listen(process.env.PORT || 5000);