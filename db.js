var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','Impakt');
var imageSchema = require('./Models/ImageModel')


db.on('error', console.error.bind(console, "Connection Error:"));
db.once('open', function(){
	console.log("We're connected!!");
})


db.model('image', imageSchema);


module.exports = db;