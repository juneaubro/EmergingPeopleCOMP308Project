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

    // <Router>
    //   <Navbar bg="light" expand="lg">
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="mr-auto">
    //         <Nav.Link href="/home"style={{ padding: 5 }}>Home</Nav.Link>
           
    //         <Nav.Link href="/addstudent"style={{ padding: 5 }}>Sign Up</Nav.Link>
    //         <Nav.Link href="/login"style={{ padding: 5 }}>Login</Nav.Link>

    //         <Nav.Link href="/addnurse"style={{ padding: 5 }}>Add Nurse</Nav.Link>
            
           
    //         <Nav.Link href="/studentlist"style={{ padding: 5 }}>Student List</Nav.Link>
            


    //         <Nav.Link href="/alertlist" style={{ padding: 5 }}>Alert List</Nav.Link>
    //         <Nav.Link href="/addalert" style={{ padding: 5 }}>Add Alert</Nav.Link>

    //         <Nav.Link href="/motivationalvideo1" style={{ padding: 5 }}>MotivationalVideo #1</Nav.Link>

        
    //         <Nav.Link href="/signout" onClick={deleteCookie}>Log out</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    
    //   <div>          
    //       <Route render ={()=> < Home />} path="/home" />
    //       <Route render ={()=> < Login />} path="/login" />
         
    //       <Route render ={()=> < EditStudent />} path="/edit/:id" />
    //       <Route render ={()=> < StudentList />} path="/studentlist" />
    //       <Route render ={()=> < AddStudent />} path="/addstudent" />
         
    //       <Route render ={()=> < AddNurse />} path="/addnurse" />

    //       <Route render ={()=> < AlertList />} path="/alertlist" />
    //       <Route render ={()=> < AddAlert />} path="/addalert" />
    //       <Route render ={()=> < MotivationalVideo1 />} path="/motivationalvideo1" />
          
      

    //   </div>

    // </Router>

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

        <Link to="/alertlist" style={{ padding: 5 }}>Alert List</Link>
        <Link to="/addalert" style={{ padding: 5 }}>Add Alert</Link>

        <Link to="/motivationalvideo1" style={{ padding: 5 }}>MotivationalVideo #1</Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginpatient" element={<LoginPatient />} />
      
        <Route path="/addnurse" element={<AddNurse />} />
        <Route path="/addpatient" element={<AddPatient />} />
       
        <Route path="/addvitalsigns" element={<AddVitalSigns />} />
        <Route path="/vitalsignslist" element={<VitalSignsList />} />
       
        <Route path="/alertlist" element={<AlertList />} />
        <Route path="/addalert" element={<AddAlert />} />
        <Route path="/motivationalvideo1" element={<MotivationalVideo1 />} />
      </Routes>
    </div>
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
