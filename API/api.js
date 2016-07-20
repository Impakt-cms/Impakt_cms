var express = require('express');
var router = express.Router();
var Image = require('../Models/ImageModel');


var newImage = new Image({
	name:'New Image Name'
})
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });

});



    console.log(newImage.name);


// more routes for our API will happen here




module.exports = router;