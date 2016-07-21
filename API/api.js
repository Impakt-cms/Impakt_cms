var express = require('express');
var router = express.Router();
var Image = require('../Models/ImageModel');
var dir = './Public/Assets'

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

.post(function(req,res){
	var d = new Date();
	var image = new Image();
	
	image.name=req.body.name+d;
	
	image.file_path = req.body.file_path;

	image.save(function(err){
		if(err){
			res.send(err);
		}
		
		res.json({message:'Image has been created!'});
		
		// Need to base 64 encode before proceeding.
		/*fs.writeFile(dir,image.name+'.jpg',function(err){
			if(err){
				res.send(err);
			}
			res.json('The file was saved to'+dir);
			
		})*/
	})

})
.get(function(req,res){

	res.json({ message: 'You landed on the beginnings of a collection' });
	Image.find(function(err,images){

		if(err){
			res.send(err);
		}

		res.json(images);
	})
})




//Find by ID, singular requests for instance
router.route('/images/:id')

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


		res.json({message:'This image was successfully deleted'})
	})
})




// more routes for our API will happen here




module.exports = router;
