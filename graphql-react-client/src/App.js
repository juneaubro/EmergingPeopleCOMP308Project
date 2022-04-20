import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  Redirect
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

//
function App() {

  return (
    <Router>
      
      <div>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/studentlist" style={{ padding: 5 }}>Student List</Link>
        <Link to="/addstudent" style={{ padding: 5 }}>Add Student</Link>
        <Link to="/editstudent" style={{ padding: 5 }}>Edit Student</Link>
        <Link to="/deletestudent" style={{ padding: 5 }}>Delete Student</Link>

        <Link to="/alertlist" style={{ padding: 5 }}>Alert List</Link>
        <Link to="/addalert" style={{ padding: 5 }}>Add Alert</Link>

        <Link to="/motivationalvideo1" style={{ padding: 5 }}>MotivationalVideo #1</Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentlist" element={<StudentList />} />
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
