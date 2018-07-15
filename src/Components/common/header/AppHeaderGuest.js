import React from 'react'
import classes from './AppHeaderGuest.css';
import {Link} from 'react-router-dom';
const AppHeaderGuest = (props) =>
{ 

    if(!props.isLoggedIn){
        return(
            <div>
                <h1 className= {classes.heading}>MyResume</h1>
                <nav>
                    <hr/>
                    <ul >
    
                            <li><a href="/login">Login</a></li> 
                            <li><a href="/register">Register</a></li> 
                    </ul>
                <hr/>
                </nav>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1 className= {classes.heading}>MyResume</h1>
                <nav>
                    <hr/>
                    <ul >
    
                            <li><Link to="/" onClick={props.logout}>Logout</Link></li> 
                    </ul>
                <hr/>
                </nav>
            </div>
        )
    }
    

}
export default AppHeaderGuest;