var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../models/user'); 

//---------CRUD FOR USERS ROUTE STARTS HERE---------//

//DISPLAY USERS
router.route('/',User.isAuthenticated)
	.get(function(req,res){
		console.log("Successfully loaded");
		User.find(function(err, users){

			if(err){
				res.json({'Error':err})
			}
			console.log("successfully found users");
			res.json(users)
		});

	});


router.route('/display/:user_id',User.isAuthenticated)
	//Display User
	.get(function(req,res){
		User.findById(req.params.user_id, function(err, user){
			if(err){
				res.send(err);
			}

			console.log("Displaying " + user.username);
			
			res.json(user);
		});
	})
	//Update User
	.put(function(req,res){
		console.log("Put has been received");
		User.findById(req.params.user_id, function(err, user){

			if (err){
				console.log(err);
				res.send(err);
			}

			user.username = req.body.username;
			user.role = req.body.role;
			
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(user.password, salt, function(err, hash) {
					user.password = hash;
					user.update(function(err){
						if(err){
							res.json({'error':err})
						}

						console.log("User has been updated")
					});
				});
			});
		});
	})
	//Delete User
	.delete(function(req,res){
		User.findById(req.params.user_id, function(err, user){
			console.log("made it inside the findById");
			
			if(err){
				res.json({message:'Delete has an: '+err});
			}
			
			if(req.user.user_id == req.params.user_id){
				res.json({message:'You cannot delete yourself'});
			}
			
			if(req.user.user_id == req.params.user_id){
				User.remove({
					_id:req.params.user_id
				}, function(err, user){
					if(err){
						res.send(err);
					}

					console.log("User was removed successfully");
				});
				res.json({message:'User has been deleted'})
			}			
		});
	});
//---------CRUD FOR USERS ROUTE ENDS HERE---------//


// REGISTER METHOD
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log("Attempting Registration...");
	console.log("Username: " + username);
	console.log("Password: " + password);
	
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	var errors = req.validationErrors();
	
	if(errors){
		console.log(errors);
		return res.status(500).send({message: "SERVER ERROR"});
	} else {
		User.getUserByUsername(username, function(err, user){
			if (err) {
				throw err; 
			}
			if (user) {
				console.log("USER NAME ALREADY EXISTS");
				return res.status(404).send({message: "USER NAME ALREADY EXISTS"});
			}
			if (!user){
				console.log('SUCCESS');
				
				var newUser = new User({
					username: username,
					password: password
				});
				
				User.createUser(newUser, function(err, user){
					if (err) throw err;
					console.log(user);
				});
				return res.status(200).send({message: "USER CREATION SUCCESS!"});
			}
		});
	}
});

// START PASSPORT MAGIC
passport.use(new LocalStrategy( 
  function(username, password, done) {
	console.log("Attempting local strategy...");
    User.getUserByUsername(username, function(err, user){
   	  if(err) throw err;
	  console.log("No err...");
   	  if(!user){
		console.log("No user matches parameters...");
   		return done(null, false, {message: 'Unknown User'});
	  }
	  console.log("comparing passwords");
   	  User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
			console.log("LOGGED IN");
   			return done(null, user);
   		} else {
			console.log("Invalid password...");
   			return done(null, false, {message: 'Invalid password'});
   		}
   	  });
    });
  }));
 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
//END PASSPORT MAGIC

//LOGIN METHOD
router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info) {
		if (err) { 
			console.log("SERVER ERROR"); 
			return res.state(500).send({message: "SERVER ERROR"});
		}
		if (!user) { 
			console.log("NO USER FOUND..."); 
			return res.status(400).send({message: "NO USER FOUND"}); 
		}
		req.logIn(user, function(err) {
			if (err) { 
				console.log("SERVER ERROR"); 
				return res.state(500).send({message: "SERVER ERROR"});
			}
			console.log("LOGIN SUCCESS!");
			return res.json(user);
		});
	})(req, res, next);
});

//LOGOUT METHOD	
router.get('/logout', function(req, res){
	req.logout();
	console.log("LOGGED OUT");
	res.redirect('/');
});

module.exports = router;