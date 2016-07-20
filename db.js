var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','Impakt');


db.on('error', console.error.bind(console, "Connection Error:"));
db.once('open', function(){
	console.log("We're connected!!");
})





module.exports = db;