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
		default: "none"
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

//-------------USER METHODS START HERE--------------//

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
	if (req.isAuthenticated() && (req.user.role == 'collaborator' || req.user.role == 'admin')) {
		return next();
	} else {
		return res.sendStatus(401);
	}  	
}
//Check for Admin Rights
module.exports.isAdmin = function(req, res, next) {
	console.log('Calling: isAdmin.....');
	console.log(req.user.role);
	if (req.user.role === "admin" ){
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

module.exports.notDeletedUser = function(req,res,next){
	console.log(req.user);
	console.log("checking if user is the same user being deleted")
	if(req.user._id	== req.params.user_id){
				console.log("fuck you, no");
				return res.json({message:'You cannot delete yourself'});
				
			}
			
	if(req.user._id != req.params.user_id){
				

					console.log("User was removed successfully");
					next();
	};

			
}

//--------------USER METHODS END HERE-----------//

