// Load the 'patients' controller
var patients = require('../../app/controllers/patients.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /patients path
    // and list patients when /patients link is selected
    app.get("/patients",patients.requiresLogin,patients.list); //go to http://localhost:3000/patients to see the list
    //handle a post request made to root path
    app.post('/', patients.create);
    //
    // Set up the 'patients' parameterized routes 
	app.route('/patients/:patientId')
    .get(patients.read)
    .put(patients.update)
    .delete(patients.delete)
    // Set up the 'patientId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('patientId', patients.patientByID);
    //authenticate patient
    app.post('/patientsignin', patients.authenticate);
    //app.post('/login', patients.authenticate);
    app.get('/signout', patients.signout);
    app.get('/read_cookie', patients.isSignedIn);


    //path to a protected page
	app.get('/welcome',patients.welcome);
    
};
