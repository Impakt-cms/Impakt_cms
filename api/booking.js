var express = require('express');
var router = express.Router();
var Booking = require('../models/booking'); 
var auth = require('../models/user');
//---------CRUD FOR USERS ROUTE STARTS HERE---------//

//DISPLAY USERS
router.route('/')
	.get(function(req,res){
		console.log("Successfully loaded booking");
		Booking.find(function(err, booking){

			if(err){
				res.json({'Error':err})
			}
			console.log("successfully found bookings");
			res.json(booking)
		});

	})
	.post(function(req,res){
		var date_time = new Date();
		var booking = new Booking();
	
		booking.bookingSubmitter = req.body.bookingSubmitter;
		booking.Email = req.body.Email;
		booking.submittedDate = date_time;
		booking.StartDate = req.body.StartDate;
		booking.EndDate = req.body.EndDate;
		booking.Time = req.body.Time;
		booking.Approved = req.body.Approved;
		booking.ApprovedBy = req.user._id;
		
		
		booking.save(function(err){
			if(err){
				res.json(err);
			}
			
			res.json({message:'Booking has been received'});
			
		})
		
	});


router.route('/:booking_id')
	//Display Booking
	.get(function(req,res){
		Booking.findById(req.params.booking_id, function(err, booking){
			if(err){
				res.send(err);
			}

			console.log("Displaying " + booking.bookingname);
			
			res.json(booking);
		});
	})
	//Update Booking
	.put(function(req,res){
		console.log("Put has been received");
		Booking.findById(req.params.booking_id, function(err, booking){

			if (err){
				console.log(err);
				res.send(err);
			}

			booking.bookingSubmitter = req.body.bookingSubmitter;
			booking.Email = req.body.Email;
			booking.submittedDate = req.body.submittedDate;
			booking.StartDate = req.body.StartDate;
			booking.EndDate = req.body.EndDate;
			booking.Time = req.body.Time;
			booking.Approved = req.body.Approved;
			booking.ApprovedBy = req.user._id;
			
			booking.save();
		});
	})
	//Delete Booking
	.delete(function(req,res){
		Booking.findById(req.params.booking_id, function(err, booking){
			console.log("made it inside the findById");
			
			if(err){
				res.json({message:'Delete has an: '+err});
			}
			
			
			Booking.remove({
					_id:req.params.booking_id
				}, function(err, booking){
					if(err){
						res.send(err);
					}

					console.log("Booking was removed successfully");
				});
				res.json({message:'Booking has been deleted'})
						
		});
	});
//---------CRUD FOR USERS ROUTE ENDS HERE---------//


module.exports = router;