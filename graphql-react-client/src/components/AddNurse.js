import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';

//

//import './display.css';
//
const ADD_NURSE = gql`
    mutation AddNurse(
        $fullName: String!
        $email: String!,
        $nurseNumber: String!,
        $password: String!     
         
        
        ) {
        addNurse(
            fullName: $fullName
            email: $email,
            nurseNumber: $nurseNumber,
            password: $password
            ) {
            _id
        }
    }
`;

const AddNurse = () => {
    let fullName, email, nurseNumber, password;
    const [addNurse, { data, loading, error }] = useMutation(ADD_NURSE);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {   
                    console.log(fullName.value);
                    e.preventDefault();
                    addNurse({ variables: { fullName: fullName.value, 
                    email: email.value, nurseNumber: nurseNumber.value,
                    password: password.value
                      } });
                
                    fullName.value = '';
                    email.value='';
                    nurseNumber.value = '';
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
            <label>Nurse Number</label>
            <input type="text" className="fields" name="nurseNumber" ref={node => {nurseNumber = node; }} 
                    placeholder="Nurse Number:" />
          </div>
          <div>
            <label>Password</label>
            <input  type="text" className="fields" name="password" ref={node => {password = node; }} 
                    placeholder="Password:" />
          </div>
        
         

           <div className="container">
                    <button type="submit" className="fields">Add Nurse</button>
            </div>
      
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default AddNurse
