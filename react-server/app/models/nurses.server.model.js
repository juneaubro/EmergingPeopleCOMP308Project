// Load the module dependencies
const mongoose = require('mongoose');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var NurseSchema = new Schema({
    fullName: String,
	
	email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	nurseNumber: {
		type: String,
		// Set a unique 'username' index
		unique: true,
		//Validate 'username' value existance
		required: 'nurseNumber is required',
		//Trim the 'username' field
		trim: true
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	
	
	
});



// Use a pre-save middleware to hash the password
// before saving it into database
// NurseSchema.pre('save', function(next){
// 	//hash the password before saving it
// 	this.password = bcrypt.hashSync(this.password, saltRounds);
// 	next();
// });

// Create an instance method for authenticating user
NurseSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password //=== bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
NurseSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('Nurse', NurseSchema);