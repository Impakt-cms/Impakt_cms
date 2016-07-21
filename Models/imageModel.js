var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var imageSchema = new Schema({
  _id: Number,
  name: String,
  file_path:String,
  location: String,
  meta: {
    Title: String
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Image = mongoose.model('Image', imageSchema);

// make this available to our users in our Node applications
module.exports = Image;
