var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb://heroku_1vpzkhfd:qbcgcvaid9rp64vtl2k2s5se4s@ds017736.mlab.com:17736/heroku_1vpzkhfd';

var db = mongoose.connect(uri,function(){
	console.log(uri);
	console.log('Db has been connected!')
});

module.exports = db;
