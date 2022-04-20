// Load the module dependencies
const Patient = require('mongoose').model('Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'patient already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};
// Create a new user
exports.create = function (req, res, next) {
	const patient = new Patient();
    patient.fullName = req.body.fullName;
    patient.email = req.body.email;
    patient.patientNumber = req.body.patientNumber;
    patient.password = req.body.password;
	patient.vitalSigns = req.body.vitalSigns;

    console.log(req.body)
   
    patient.save((err) => {
        if (err) {
            console.log('error', getErrorMessage(err))

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(patient);
        }
    });
};
//
// Returns all patients
exports.list = function (req, res, next) {
    // Use the 'Patient' instance's 'find' method to retrieve a new patient document
    Patient.find({}, function (err, patients) {
        if (err) {
            return next(err);
        } else {
            res.json(patients);
        }
    });
};
//
//'read' controller method to display a patient
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.patient);
};
//
// 'patientByID' controller method to find a patient by its id
exports.patientByID = function (req, res, next, id) {
	// Use the 'User' static 'findOne' method to retrieve a specific patient
	Patient.findOne({
        _id: id
	}, (err, patient) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.patient = patient;
            console.log(patient);
			// Call the next middleware
			next();
		}
	});
};
//update a patient by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Patient.findByIdAndUpdate(req.patient.id, req.body, function (err, patient) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(patient);
    });
};
// delete a patient by id
exports.delete = function(req, res, next) {
    Patient.findByIdAndRemove(req.patient.id, req.body, function (err, patient) {
      if (err) return next(err);
      res.json(patient);
    });
};
//
// authenticates a patient
exports.authenticate = function(req, res, next) {
	// Get credentials from request
	const patientNumber = req.body.auth.patientNumber;
	const password  = req.body.auth.password;
	
	//find the user with given username using static method findOne
	Patient.findOne({patientNumber: patientNumber}, (err, patient) => {
			if (err) {
				return next(err);
			} else {
			console.log(patient)
			//compare passwords	
			
			if(password === patient.password) {
				// Create a new token with the user id in the payload
  				// and which expires 300 seconds after issue
				const token = jwt.sign({ id: patient._id, patientNumber: patient.patientNumber }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: patient.patientNumber });
				//
				//res.json({status:"success", message: "user found!!!", data:{user:
				//user, token:token}});
				
				req.patient=patient;
				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid patient number/password!!!",
				data:null});
			}
		}
		
	 });
	
};
//
// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the user, along with their
	// username given in the token
	// use back-quotes here
	res.send(`${payload.patientNumber}`)
 };
 //
 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the user back to the main application page
	//res.redirect('/');
}
//check if the user is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the username given in the token
	res.status(200).send({ screen: payload.patientNumber });
}

//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// user is authenticated
	//call next function in line
    next();
};