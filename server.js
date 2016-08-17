// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express             
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var api_routes =  require('./api/api')
var path = require('path');
var timeout = require('connect-timeout'); //express v4
var flash = require('connect-flash');
var validator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = require('./data/db');
var multiparty = require('connect-multiparty');
var User = require('./models/user');
var users = require('./api/users');
var booking = require('./models/booking');

var app = express();

app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


User.getUserByUsername("sysadmin", function(err,user,next){
  if(err){
    throw err;
  }

  if(!user){
    var newUser = new User({
          username: "sysadmin",
          password: "welcome1",
          role: "admin"
    });

    User.createUser(newUser, function(err, user){
          if (err) throw err;
          console.log("sysadmin has been auto generated, refer to docs");
        });
  }
  if(user){
    console.log("Sys admin already exists");
  }

})

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Validator setup.
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

// Flash setup.
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('users', users);
app.use('/api/booking', booking);

var port = process.env.PORT || 8080;        // set our port


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(express.static(path.join(__dirname, '/public/admin/views')));
//Using express.static to fetch different file types.
app.use('/api', api_routes);
app.use(express.static(__dirname+'/assets'));
app.use('/js', express.static(__dirname + '/public/admin/js'));
app.use('/css', express.static(__dirname + '/public/admin/css'));
app.use('/controllers', express.static(__dirname + '/public/admin/controllers'));
app.use('/directives', express.static(__dirname + '/public/admin/directives'));


//Fetching 404 as default if others fall through.
app.all('/*', function(req, res, next) {
	res.sendFile('./public/admin/views/404.html', { root: __dirname });
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);