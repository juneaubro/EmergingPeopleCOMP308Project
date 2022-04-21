
import React, { useState } from 'react';

//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
 
  //
  return (
    <div className="App">
      
      
      <h1>Your Nurse ID: {screen}</h1>
      <h1>{data}</h1>

      <h2>Welcome, please use the nav bar to navigate.</h2>
      
      


      <h4>Created by:</h4>
      <h5>COMP308 (004) Group 2 - Emerging People</h5>




      
      
      
    </div>
  );
}

//
export default View;