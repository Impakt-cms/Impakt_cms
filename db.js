var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/Impakt',function(){


	console.log('Db has been connected!')
});







module.exports = db;