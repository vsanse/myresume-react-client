import React, { Component } from 'react';
import { CGPA10, CGPA5, PERCENT } from '../Constants/index'
import classes from './EducationComponent.css'
import {
    GRADUATION,
    POST_GRADUATION,
} from '../Constants/index';
class ShowProfileEducationDetails extends Component {

    render() {
        return (
            <div>
                {
                    this.props.eduDetail &&
                    this.props.eduDetail.map((details) => {
                        return (
                            <div className={classes.eduFlexBody} key={details.id} id="editForm">
                                <div className={classes.detailHeading}>
                                    {
                                        (details.educationType === GRADUATION || details.educationType === POST_GRADUATION) &&
                                        <p><strong>{details.degree} {details.stream}</strong></p>
                                    }
                                    {
                                        (details.educationType !== GRADUATION && details.educationType !== POST_GRADUATION) &&
                                        <p><strong>{details.educationType} {details.stream}</strong></p>
                                    } 
                                    <div className={classes.details}>

                                        <p>{details.board}<span> ( {details.institution} )</span></p>
                                        <p>Year Of Completion:{details.yearOfCompletion}</p>
                                        {details.performanceScale === CGPA10 &&
                                            <p>CGPA : {details.performance}/10</p>
                                        }
                                        {details.performanceScale === CGPA5 &&
                                            <p>CGPA : {details.performance}/10</p>
                                        }
                                        {details.performanceScale === PERCENT &&
                                            <p>Percentage : {details.performance}%</p>
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
            </div>

        )
    }

}
export default ShowProfileEducationDetails;