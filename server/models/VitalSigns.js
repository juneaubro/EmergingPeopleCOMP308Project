// Load the module dependencies
const mongoose = require('mongoose');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var VitalSignsSchema = new Schema({
    bodyTemp: String,
	heartRate: String,
	bloodPressure: String,
	respiratoryRate: String,

});



// Create an instance method for authenticating user
VitalSignsSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password //=== bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
VitalSignsSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('VitalSigns', VitalSignsSchema);