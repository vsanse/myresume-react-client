import React from 'react';
import { Component} from 'react'
import {
    SECONDARY_EDUCATION, 
    SENIOR_SECONDARY_EDUCATION,
    GRADUATION,
    POST_GRADUATION,
    PHD,
    DIPLOMA
         } from '../Constants/index';
import classes  from './EducationComponent.css';
class Education extends Component {
    state = {
        eduDetails:[
            SECONDARY_EDUCATION, 
            SENIOR_SECONDARY_EDUCATION,
            GRADUATION,
            POST_GRADUATION,
            PHD,
            DIPLOMA
        ],

    }
    render(){
        return(
            <div className = {classes.education}>
                <div className = {classes.eduHeading}>
                    <div className={classes.heading}>
                        <strong>EDUCATION:</strong> 
                        </div>
                    <div className={classes.icon}>
                        <i className = "fas fa-plus fa-1x"></i>
                        </div>
                </div>
                <hr/>
                <div className = 'eduContent'>
                    {this.state.eduDetails}
                </div>    
            </div>
        )
    }

}
export default Education;