import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';

//

//import './display.css';
//
const ADD_PATIENT = gql`
    mutation AddPatient(
        $fullName: String!
        $email: String!,
        $patientNumber: String!,
        $password: String!     
         
        
        ) {
        addPatient(
            fullName: $fullName
            email: $email,
            patientNumber: $patientNumber,
            password: $password
            ) {
            _id
        }
    }
`;

const AddPatient = () => {
    let fullName, email, patientNumber, password;
    const [addPatient, { data, loading, error }] = useMutation(ADD_PATIENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {   
                    console.log(fullName.value);
                    e.preventDefault();
                    addPatient({ variables: { fullName: fullName.value, 
                    email: email.value, patientNumber: patientNumber.value,
                    password: password.value
                      } });
                
                    fullName.value = '';
                    email.value='';
                    patientNumber.value = '';
                    password.value = '';
                    
                    
                }}
            >
        <Jumbotron>
       
          <div>
            <label> Full Name</label>
            <input type="text" className="fields" name="fullName" ref={node => {fullName = node; }} 
                    placeholder="Full Name:" />
          </div>
         
          <div>
            <label>Email</label>
            <input  type="text" className="fields" name="email" ref={node => {email = node; }} 
                    placeholder="Email:"/>
          </div>
          <div>
            <label>Patient Number</label>
            <input type="text" className="fields" name="patientNumber" ref={node => {patientNumber = node; }} 
                    placeholder="Patient Number:" />
          </div>
          <div>
            <label>Password</label>
            <input  type="text" className="fields" name="password" ref={node => {password = node; }} 
                    placeholder="Password:" />
          </div>
        
         

           <div className="container">
                    <button type="submit" className="fields">Add Patient</button>
            </div>
      
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default AddPatient
