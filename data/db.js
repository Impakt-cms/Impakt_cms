var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = process.env.MONGOLAB_URI ||
		  process.env.MONGOHQ_URL || 
		  'mongodb://localhost/Impakt';


var db = mongoose.connect(uri,function(){
	console.log(uri);
	console.log('Db has been connected!')
});

module.exports = db;
