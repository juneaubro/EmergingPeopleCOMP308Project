import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';

//

//import './display.css';
//
const ADD_VITALSIGNS = gql`
    mutation AddVitalSigns(
        $bodyTemp: String!
        $heartRate: String!,
        $bloodPressure: String!,
        $respiratoryRate: String!     
         
        
        ) {
        addVitalSigns(
            bodyTemp: $bodyTemp
            heartRate: $heartRate,
            bloodPressure: $bloodPressure,
            respiratoryRate: $respiratoryRate
            ) {
            _id
        }
    }
`;

const AddVitalSigns = () => {
    let bodyTemp, heartRate, bloodPressure, respiratoryRate;
    const [addVitalSigns, { data, loading, error }] = useMutation(ADD_VITALSIGNS);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {   
                    console.log(bodyTemp.value);
                    e.preventDefault();
                    addVitalSigns({ variables: { bodyTemp: bodyTemp.value, 
                    heartRate: heartRate.value, bloodPressure: bloodPressure.value,
                    respiratoryRate: respiratoryRate.value
                      } });
                
                    bodyTemp.value = '';
                    heartRate.value='';
                    bloodPressure.value = '';
                    respiratoryRate.value = '';
                    
                    
                }}
            >
        <Jumbotron>
       
          <div>
            <label>Body Temperature</label>
            <input type="text" className="fields" name="bodyTemp" ref={node => {bodyTemp = node; }} 
                    placeholder="Body Temp:" />
          </div>
         
          <div>
            <label>Heart Rate</label>
            <input  type="text" className="fields" name="heartRate" ref={node => {heartRate = node; }} 
                    placeholder="Heart Rate:"/>
          </div>
          <div>
            <label>Blood Pressure</label>
            <input type="text" className="fields" name="bloodPressure" ref={node => {bloodPressure = node; }} 
                    placeholder="Blood Pressurer:" />
          </div>
          <div>
            <label>Respiratory Rate</label>
            <input  type="text" className="fields" name="respiratoryRate" ref={node => {respiratoryRate = node; }} 
                    placeholder="Respiratory Rate:" />
          </div>
        
         

           <div className="container">
                    <button type="submit" className="fields">Add Vital Signs</button>
            </div>
      
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default AddVitalSigns
