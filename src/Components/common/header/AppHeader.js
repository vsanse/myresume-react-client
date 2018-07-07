import React from 'react'
import classes from './AppHeader.css';
const AppHeader = () =>
{ return(<div>
    <h1 className= {classes.heading}>MyResume</h1>
    <nav>
        <hr/>
        <ul >
            <li><a href="/login">Login</a></li> 
            <li><a href="/register">Register</a></li> 
       </ul>
       <hr/>
    </nav>
    </div>)

}
export default AppHeader;