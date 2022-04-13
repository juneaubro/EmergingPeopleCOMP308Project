import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
//
import './addstyle.css';
//import './display.css';
//
const ADD_STUDENT = gql`
    mutation AddStudent(
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $college: String!,
        $program: String!,
        $startingYear: Int!        
        
        ) {
        addStudent(
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            college: $college,
            program: $program,
            startingYear: $startingYear
            
            ) {
            _id
        }
    }
`;

const AddStudent = () => {

    let firstName, lastName, email, college, program, startingYear ;
    const [addStudent, { data, loading, error }] = useMutation(ADD_STUDENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addStudent({ variables: { firstName: firstName.value, lastName: lastName.value, 
                    email: email.value, college: college.value, 
                    program: program.value,
                    startingYear: parseInt(startingYear.value) 
                      } });
                
                    firstName.value = '';
                    lastName.value='';
                    email.value='';
                    college.value='';
                    program.value='';
                    startingYear.value='';

                }}
            >
                <div class="outer_container">
                <div class="container">
                    <label>
                        <b>First Name:</b>
                    </label>
                    <input type="text" class="fields" name="firstName" ref={node => {firstName = node; }} 
                    placeholder="First Name:" />
                </div>
                <div class="container">
                    <label>
                        <b>Last Name:</b>
                    </label>
                    <input type="text" class="fields" name="lastName" ref={node => {lastName = node; }}
                    placeholder="Last Name:" />
                </div>
                <div class="container">
                    <label>
                        <b>Email:</b>
                    </label>
                    <input type="text" class="fields" name="email" ref={node => {email = node; }}
                    placeholder="Email:" />
                </div>
                <div class="container">
                    <label>
                        <b>College:</b>
                    </label>
                    <input type="text" class="fields" name="college" ref={node => {college = node; }}
                    placeholder="College:" />
                </div>
                <div class="container">
                    <label>
                        <b>Program:</b>
                    </label>
                    <input type="text" class="fields" name="program" ref={node => {program = node; }}
                    placeholder="Program:" />
                </div>

                <div class="container">
                    <label>
                        <b>Starting Year:</b>
                    </label>
                    <input type="text" class="fields" name="startingYear" ref={node => {startingYear = node; }}
                    placeholder="Starting Year:" />
                </div>

                <div class="container">
                    <button type="submit" class="fields">Add Student</button>

                </div>
                </div>
            </form>
        </div>
    );
}

export default AddStudent
