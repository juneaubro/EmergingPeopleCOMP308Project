import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
//
import './addstyle.css';
//import './display.css';
//
const ADD_DAILYINFO = gql`
    mutation AddDailyInfo(
        $pulseRate: String!
        $bloodPressure: String!,
        $weight: String!,
        $temperature: String!,
        $respiratoryRate: String!,  
         
        ) {
        addDailyInformation(
            pulseRate: $pulseRate
            bloodPressure: $bloodPressure,
            weight: $weight,
            temperature: $temperature,
            respiratoryRate: $respiratoryRate
            ) {
            _id
        }
    }
`;

const AddDailyInformation = () => {

    let pulseRate, bloodPressure, weight, temperature, respiratoryRate;
    const [addDailyInformation, { data, loading, error }] = useMutation(ADD_DAILYINFO);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addDailyInformation({ variables: {
                        pulseRate: pulseRate.value,
                        bloodPressure: bloodPressure.value,
                        weight: weight.value,
                        temperature: temperature.value,
                        respiratoryRate: respiratoryRate.value

                    } });
                
                    pulseRate.value = '';
                    bloodPressure.value = '';
                    weight.value = '';
                    temperature.value = '';
                    respiratoryRate.value = '';
                }}
            >
                <div className="outer_container">
                <div className="container">
                    <label>
                        <b>Pulse Rate:</b>
                    </label>
                    <input type="text" className="fields" name="pulseRate" ref={node => {pulseRate = node; }}
                        placeholder="Pulse Rate:"/>
                    <label>
                        <b>Blood Pressure:</b>
                    </label>
                    <input type="text" className="fields" name="bloodPressure" ref={node => {bloodPressure = node; }}
                        placeholder="Blood Pressure:"/>
                    <label>
                        <b>Weight:</b>
                    </label>
                    <input type="text" className="fields" name="pulseRate" ref={node => {weight = node; }}
                        placeholder="Weight:"/>
                    <label>
                        <b>Temperature:</b>
                    </label>
                    <input type="text" className="fields" name="temperature" ref={node => {temperature = node; }}
                        placeholder="Temperature:"/>
                    <label>
                        <b>Respiratory Rate:</b>
                    </label>
                    <input type="text" className="fields" name="respiratoryRate" ref={node => {respiratoryRate = node; }}
                        placeholder="Respiratory Rate:"/>
                </div>
                <div className="container">
                    <button type="submit" className="fields">Add Daily Information</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default AddDailyInformation
