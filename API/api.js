var express = require('express');
var router = express.Router();
var Image = require('../Models/ImageModel');
var UserController = ('/helperFunctions/UserController');
var fs = require('fs');
var dir = './Public/Assets/'
var multiparty = require('connect-multiparty');
var multipartymiddleware = multiparty();


var newImage = new Image({
	name:'New Image Name'
})
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });

});

//Images will be saved to the server via fs.readsync
//Image file paths will be saved to the database and iterated over
//Via the front end (angular)


// Create, List for images collection
router.route('/images')

.post(multipartymiddleware,function(req,res,next){
				UserController.uploadFile;
				next();

},function(req,res){ 
	for (var prop in req.files.file){
		var value = req.files.file[prop];
		console.log(prop + ': ' + value);
	}
	var date_time = new Date();
	var date_string= new Date().toISOString();
	var image = new Image();
	
	image.name=date_string+req.body.name;
	console.log("Image name: " + image.name);
	image.file_path=dir+image.name;
	console.log("Image file path: " + image.file_path);
	image.meta.Title=req.body.Title;
	image.created_at= date_time; 
	console.log("Created at: " + image.created_at);

	var filepath = req.files.file.path;


	image.save(function(err){
		console.log('This is before the mongoose model picks up');
		if(err){
			res.send(err);
		}

		console.log('Success');
		res.json({message:'Image has been created!'});
		fs.writeFile(filepath,function(err){
			if(err){
				console.log(err);
				//res.send(err); <--Commented out because of Response Header Errors.
			}
			//res.json <--Commented out because of Response Header Errors.
			console.log('The file was saved to'+dir);
			
		});
	});


		
    
		//Need to base 64 encode before proceeding.
		/*fs.readFile(req.files.image.path,function(err,data){
			if (err) {
				console.log('There was an error!');
			}
			var newpath=image.file_path;
			fs.writeFile(newpath,data,function(err){
			if(err){
				res.send(err);
			}
			res.json('The file was saved to'+dir);
			
		})
		})*/
				console.log('Success');
})
.get(function(req,res){

	
	Image.find(function(err,images){

		if(err){
			res.send(err);
		}

		res.json(images);
	})
})




//Find by ID, singular requests for instance
router.route('/images/:image_id')

.get(function(req,res){
	Image.findById(req.params.image_id, function(err, image){
		if(err){
			res.send(err);
		}

		res.json(image);
	})
})

.put(function(req,res){
	Image.findById(req.params.image_id, function(err, image){

		if (err){
			res.send(err);
		}

		image.name=req.body.name;
	
		image.file_path = req.body.file_path;

		image.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message:'This image has been updated!'});
	})

	})
})
//so far this only deletes a the file path and not the server file upon delete
.delete(function(req,res){
	
	Image.remove({
		_id:req.params.image_id
	}, function(err, image){
		if(err){
			res.send(err);
		}
		console.log("deleting file now...")
		fs.unlink(image.file_path, function(err){
			if(err){
				res.send(err);
			}

			console.log("File has been unlinked");
		})

		res.json({message:'This image was successfully deleted'})
	})
})




// more routes for our API will happen here




module.exports = router;
	