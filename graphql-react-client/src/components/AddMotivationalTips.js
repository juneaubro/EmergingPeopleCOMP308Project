import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
//
import './addstyle.css';
//import './display.css';
//
const ADD_TIPS = gql`
    mutation AddMotivationalTips($message : String!){
        addMotivationalTips(message: $message){
          message
          nurse
        }
    }
`;

const AddMotivationalTips = () => {

    let message;
    const [addMotivationalTips, { data, loading, error }] = useMutation(ADD_TIPS);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addMotivationalTips({ variables: {
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
                <div class="container">
                    <button type="submit" className="fields">Add MotivationalTips</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default AddMotivationalTips
