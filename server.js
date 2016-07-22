// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var api_routes =  require('./API/api')
var path = require('path');
var db = require('./db');
var timeout = require('connect-timeout'); //express v4


app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


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






