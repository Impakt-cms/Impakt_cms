var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	role: {
		type: String,
		required:true,
		default: "contributor"
	}
});


var User = module.exports = mongoose.model('User', UserSchema);




//Register User
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
		if(err){
			console.log(err); //handle error
		}
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	    	if(err){
	    		console.log(err); //handle error
	    	}
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
//Ensure user is logged in
module.exports.isAuthenticated = function(req, res, next) {
            console.log('Calling: isAuthenticated.....');
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.sendStatus(401);
            }
           	
}
module.exports.isAdmin = function(req, res, next) {
            console.log('Calling: isAdmin.....');
            if (req.isAuthenticated() && user.role == "admin" ){
                return next();
            } else {
                return res.sendStatus(401);
            }
}



//Find User by Username
module.exports.getUserByUsername = function(username, callback){
	console.log("QUERY: USERNAME = " + username);
	var query = {username: username};
	User.findOne(query, callback);
}
//Find User by Id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

//Compare user password with password given.
module.exports.comparePassword = function(candidate, hash, callback){
	bcrypt.compare(candidate, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}