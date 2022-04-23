import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
//
import './addstyle.css';
//import './display.css';
//
const ADD_ALERT = gql`
    mutation AddAlert($message : String!){
        addEmergencyAlert(message: $message){
          message
          nurse
        }
    }
`;

const AddAlert = () => {

    let message;
    const [addEmergencyAlert, { data, loading, error }] = useMutation(ADD_ALERT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addEmergencyAlert({ variables: {
                        message: message.value
                    } });
                
                    message.value = '';
                }}
            >
                <div className="outer_container">
                <div className="container">
                    <label>
                        <b>Message:</b>
                    </label>
                    <input type="text" className="fields" name="message" ref={node => {message = node; }} 
                    placeholder="Message..." />
                </div>
                <div className="container">
                    <button type="submit" className="fields">Add Alert</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default AddAlert
