var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var imageSchema = new Schema({
  name: {type:String,required:true},
  file_path:{type:String, required:true},
  public_id:{type:String, required:true},
  category: {type:String, default: "Splash"},
  sort:{type:Number, default:1},
  author: String,
  meta: {
    Title: {type:String, default:"NewImage"}
	},
  created_at: {type:Date, required:true},
  updated_at: Date,
  
});

// the schema is useless so far
// we need to create a model using it
var Image = mongoose.model('Image', imageSchema);

// make this available to our users in our Node applications

module.exports = Image;

