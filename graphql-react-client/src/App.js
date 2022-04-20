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
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';

import AddAlert from './components/AddAlert';
import AlertList from './components/AlertList';

import MotivationalVideo1 from './components/MotivationalVideo1';

import Home from './components/Home';
import Login from './components/Login';

import AddNurse from './components/AddNurse';


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
        <Link to="/login">Login</Link>
        <Link to="/studentlist" style={{ padding: 5 }}>Student List</Link>
        <Link to="/addstudent" style={{ padding: 5 }}>Add Student</Link>
        <Link to="/editstudent" style={{ padding: 5 }}>Edit Student</Link>
        <Link to="/deletestudent" style={{ padding: 5 }}>Delete Student</Link>

        <Link to="/addnurse" style={{ padding: 5 }}>Add Nurse</Link>

        <Link to="/alertlist" style={{ padding: 5 }}>Alert List</Link>
        <Link to="/addalert" style={{ padding: 5 }}>Add Alert</Link>

        <Link to="/motivationalvideo1" style={{ padding: 5 }}>MotivationalVideo #1</Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/addnurse" element={<AddNurse />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/editstudent" element={<EditStudent />} />
        <Route path="/deletestudent" element={<DeleteStudent />} />
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
