var mongoose = require('mongoose');



var imageSchema = mongoose.Schema({
	name: 'string'
})

console.log('Image Schema has been loaded');



module.exports = imageSchema;