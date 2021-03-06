var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookingSchema = new Schema({
  bookingSubmitter: {type:String,required:true},
  Email:{type:String, required:true},
  Phone:String,
  submittedDate: Date,
  StartDate: Date,
  EndDate: Date,
  Approved:{type:Boolean, default:false},
  ApprovedBy: Schema.Types.ObjectId,
  Description:String
});

// the schema is useless so far
// we need to create a model using it
var Booking = mongoose.model('Booking', bookingSchema);

// make this available to our users in our Node applications
module.exports = Booking;
