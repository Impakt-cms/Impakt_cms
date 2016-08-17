var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : {type: String,required: true},
        password     : String,
        Role         : String,
        FirstName    : String,
        Approved     : {type: Boolean,required: true},
        LastName     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : {type: String,required: true}
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : {type: String,required: true},
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : {type: String,required: true}
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
