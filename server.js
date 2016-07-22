// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var api_routes =  require('./API/api')
var path = require('path');
var timeout = require('connect-timeout'); //express v4
var flash = require('connect-flash');
var db = require('./db');
var validator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');


app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Set up validator (Middleware Options: https://github.com/ctavan/express-validator)
app.use(validator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Set up flash
app.use(flash());
//Flash Global Vars
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// Set our port
var port = process.env.PORT || 8080;        

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(express.static(path.join(__dirname, '/Views')));
//Using express.static to fetch different file types.
app.use('/api', api_routes);
app.use('/js', express.static(__dirname + '/Public/JS'));
app.use('/css', express.static(__dirname + '/Public/CSS'));
app.use('/Controllers', express.static(__dirname + '/Controllers'));
//Fetching index.html as default if others fall through.
app.all('/*', function(req, res, next) {
	res.sendFile('/Views/index.html', { root: __dirname });
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);






