import React from 'react'
import classes from './AppHeaderGuest.css';
const AppHeaderGuest = (props) =>
{ 
    console.log(props)
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
export default AppHeaderGuest;