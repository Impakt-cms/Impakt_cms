var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = process.env.MONGOLAB_URI || 'localhost:27017/Impakt';
mongoose.connect(uri, function(){

	console.log('success');

})
var db = mongoose.connect(uri,function(){
	console.log('Db has been connected!')
});

module.exports = db;