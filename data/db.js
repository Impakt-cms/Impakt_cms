var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = process.env.MONGOLAB_URI;

var db = mongoose.connect(uri,function(){
	console.log('Db has been connected!')
});

module.exports = db;