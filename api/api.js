var express = require('express');
var router = express.Router();
var Image = require('../models/imageModel');
var UserController = ('/helperFunctions/UserController');
var fs = require('fs');
var dir = './assets/';
var multiparty = require('connect-multiparty');
var multipartymiddleware = multiparty();
var auth = require('../models/user');
var cloudinary = require('cloudinary');

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'This is the images crud api' });

});

//Images will be saved to the server via fs.readsync
//Image file paths will be saved to the database and iterated over
//Via the front end (angular)


router.get('/categories', function(req,res,next){
	Image.find().distinct('category',function(err,categories){
			if(err){
				res.json({message:'the following error occurred: '+err});
			}
			res.json(categories);
	});
});


// Create, List for images collection
router.route('/images')
	.post(auth.isAuthenticated,multipartymiddleware,
		function(req,res,next){
			UserController.uploadFile;
			next();
		},function(req,res){ 
			for (var prop in req.files.file){
				var value = req.files.file[prop];
				console.log(prop + ': ' + value);
			}
			var date_time = new Date();
			var date_string= new Date().toISOString().replace(new RegExp(':', 'g'),'.');
			var image = new Image();
			var filepath = req.files.file.path;
			
			image.meta.Title = req.body.Title;
			image.name = date_string + '.jpg';
			image.created_at = date_time; 
			image.category = req.body.category;
			
			
			/*if(!fs.existsSync(dir+image.category)){
				fs.mkdirSync(dir+image.category)
			}*/
			for(var file in req.files){
			cloudinary.uploader.upload(filepath, function(result) { 
			console.log(result) 
				image.public_id = result.public_id;
				image.file_path = result.secure_url;
				console.log(JSON.stringify(image));
				image.save(function(err){
					if(err){
						res.send(err);
					}
					
					res.json({message:'Image has been created!'});

				
				});
			});

			
				
			}
		})
		
	.get(function(req,res){
		Image.find(function(err,images){

			if(err){
				res.json(err);
			}

			res.json(images);
		});
	});


//Find by ID, singular requests
router.route('/images/:image_id')


	.get(function(req,res){
		Image.findById(req.params.image_id, function(err, image){
			if(err){
				res.json(err);
			}

			console.log(image.file_path);
			
			res.json(image);
		})
	})

	.put(function(req,res){
		Image.findById(req.params.image_id, function(err, image){

			if (err){
				res.json(err);
			}

			image.meta.Title = req.body.title;

			image.updated_at = new Date(); 
			image.category = req.body.category;
			image.sort = req.body.sort;
			image.save(function(err){
				if(err){
					res.json(err);
				}
				res.json({message:'This image has been updated!'});
			});

		});
	})
	
	//so far this only deletes a the file path and not the server file upon delete
	.delete(auth.isAuthenticated,function(req,res){
		
		Image.findById(req.params.image_id, function(err, image){
			if(err){
				res.json(err);
			}
			cloudinary.uploader.destroy(image.public_id, function(result){
				console.log(result);
			Image.remove({_id:req.params.image_id}, function(err, image){
					if(err){
						res.json(err);
						console.log(err);
					}

					res.json({message:'This image has been deleted!'});
					console.log("Image was deleted")
				});
				console.log("File has been unlinked");
			});

			})

	});

// more routes for our API will happen here

module.exports = router;
	

