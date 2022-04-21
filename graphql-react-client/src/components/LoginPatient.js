import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';

import axios from 'axios';
//
import View from './View'
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [patientNumber, setPatientNumber] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/patientsignin";
  //send patientNumber and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(patientNumber)
    console.log(password)
    try {
      console.log("in try");
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { patientNumber, password } }
      //call api
      console.log("before post");
      const res = await axios.post(apiUrl, loginData);
      console.log("data auth "+ res.data.auth);
      console.log("data screen " + res.data.screen);
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === 'auth' 
        ? <div>
          <label>Patient Number: </label>
          <br/>
          <input type="text" onChange={e => setPatientNumber(e.target.value)} />
          <br/>
          <label>Password: </label>
          <br/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br/>
          
          
          <button onClick={auth}>Login</button>
        </div>
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;

