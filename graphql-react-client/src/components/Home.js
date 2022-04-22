
import React, { Component }  from 'react';
import {    Link  } from "react-router-dom";
import { Button} from 'react-bootstrap';
function Home(props)
{


    return (
        <div>
            <h2> Choose who you want to login as...</h2>
            <Link to='/loginpatient'>
                <Button className='btnLogin'> Login as Client </Button>
            </Link>
            <Link to='/login'>
                <Button className='btnLogin'> Login as Nurse </Button>
            </Link>
        </div>
    );

}

export default Home;