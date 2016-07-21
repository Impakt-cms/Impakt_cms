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

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(express.static(path.join(__dirname, '/Views')));

app.use('/api', api_routes);

//Register a catch all for our angular routes to take over


app.get('*', function(req,res){
    res.sendFile(path.join(__dirname+ '/Views/index.html'));
})






// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);






