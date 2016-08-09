var express = require('express');
var router = express.Router();
var Image = require('../models/imageModel');
var UserController = ('/helperFunctions/UserController');
var fs = require('fs');
var dir = './assets/';
var multiparty = require('connect-multiparty');
var multipartymiddleware = multiparty();
var auth = require('../models/user');


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'This is the images crud api' });

});

//Images will be saved to the server via fs.readsync
//Image file paths will be saved to the database and iterated over
//Via the front end (angular)


// Create, List for images collection
router.route('/images')

.post(auth.isAuthenticated,multipartymiddleware,function(req,res,next){
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
	
	

	image.meta.Title = req.body.Title;
	image.name = date_string + '.jpg';
	image.created_at = date_time; 
	image.category = req.body.category;
	console.log(image.category);

	/*if(!fs.existsSync(dir+image.category)){
		fs.mkdirSync(dir+image.category)
	}*/

	image.file_path = dir + image.name;
	var filepath = req.files.file.path;
	

	for(var file in req.files){
		image.save(function(err){
			if(err){
				res.send(err);
			}
			
			res.json({message:'Image has been created!'});

			fs.readFile(filepath, function(err, data){
				if(err){
					res.json(err);
					//res.send(err); <--Commented out because of Response Header Errors.
				}	
				
				fs.writeFile(image.file_path,data,function(err){
					if(err){
						console.log(err);
						res.json(err);
						//res.send(err); <--Commented out because of Response Header Errors.
					}	
					//res.json <--Commented out because of Response Header Errors.
					console.log('The file was saved to'+dir);
				
				});
			});
		});
};



})
.get(function(req,res){

	
	Image.find(function(err,images){

		if(err){
			res.json(err);
		}

		res.json(images);
	})
})




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

.put(auth.isAuthenticated,function(req,res){
	Image.findById(req.params.image_id, function(err, image){

		if (err){
			res.json(err);
		}

		image.name=req.body.name;
	
		image.file_path = req.file_path;

		image.save(function(err){
		if(err){
			res.json(err);
		}
		res.json({message:'This image has been updated!'});
	})

	})
})
//so far this only deletes a the file path and not the server file upon delete
.delete(auth.isAuthenticated,function(req,res){
	
Image.findById(req.params.image_id, function(err, image){
		if(err){
			res.json(err);
		}

		console.log(image.file_path);
		fs.unlink(image.file_path, function(err){
			if(err){
				res.json(err);
				console.log(err);
			}


			Image.remove({
			_id:req.params.image_id
			}, function(err, image){
			if(err){
			res.json(err);
			console.log(err);
			}

		res.json({message:'This image has been deleted!'});
		console.log("Image was deleted")
	})
			console.log("File has been unlinked");
		})
		
	})





	
})




// more routes for our API will happen here




module.exports = router;
	