import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  Routes
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//


import AddAlert from './components/AddAlert';
import AlertList from './components/AlertList';

import MotivationalVideo1 from './components/MotivationalVideo1';

import Home from './components/Home';
import Login from './components/Login';
import LoginPatient from './components/LoginPatient';

import AddNurse from './components/AddNurse';
import AddPatient from './components/AddPatient';

import AddVitalSigns from './components/AddVitalSigns';
import VitalSignsList from './components/VitalSignsList';

import AddMotivationalTips from './components/AddMotivationalTips';

import AddDailyInformation from './components/AddDailyInfo';
import DailyInformationList from './components/DailyInfoList';
import CommonSymptons from './components/CommonSymptons'

import axios from 'axios';

//
function App() {

  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
    } catch (e) {
      console.log(e);
    }
  };
  return (

    <Router>
      
      <div>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/login"style={{ padding: 5 }}>Login</Link>
        <Link to="/loginpatient"style={{ padding: 5 }}>Login Patient</Link>
       

        <Link to="/addnurse" style={{ padding: 5 }}>Add Nurse</Link>
        <Link to="/addpatient" style={{ padding: 5 }}>Add Patient</Link>

        <Link to="/addvitalsigns" style={{ padding: 5 }}>Add VitalSigns</Link>
        <Link to="/vitalsignslist" style={{ padding: 5 }}>VitalSigns List</Link>

        <Link to="/addmotivationaltips" style={{ padding: 5 }}>Add Motivational Tips</Link>

        <Link to="/alertlist" style={{ padding: 5 }}>Alert List</Link>
        <Link to="/addalert" style={{ padding: 5 }}>Add Alert</Link>

        <Link to="/motivationalvideo1" style={{ padding: 5 }}>MotivationalVideo #1</Link>

        <Link to="/dailyinfolist" style={{ padding: 5 }}>Daily Information List</Link>
        <Link to="/adddailyinfo" style={{ padding: 5 }}>Add Daily Information</Link>
        <Link to="/commonsymptons" style={{ padding: 5 }}>Common Symptons Diagnosis</Link>

        <Link to="/signout" onClick={deleteCookie}>Log out</Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginpatient" element={<LoginPatient />} />
      
        <Route path="/addnurse" element={<AddNurse />} />
        <Route path="/addpatient" element={<AddPatient />} />
       
        <Route path="/addvitalsigns" element={<AddVitalSigns />} />
        <Route path="/vitalsignslist" element={<VitalSignsList />} />
       
        <Route path="/addmotivationaltips" element={<AddMotivationalTips />} />

        <Route path="/alertlist" element={<AlertList />} />
        <Route path="/addalert" element={<AddAlert />} />
        <Route path="/motivationalvideo1" element={<MotivationalVideo1 />} />

        <Route path="/dailyinfolist" element={<DailyInformationList />} />
        <Route path="/adddailyinfo" element={<AddDailyInformation />} />
        <Route path="/commonsymptons" element={<CommonSymptons />} />
      </Routes>
    </div>
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
