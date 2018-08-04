import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';
import { deleteProjectDetails, updateProjectDetails } from '../Utils/ApiUtils'
import commonClasses from '../common/common.css'
import { reverseString } from '../common/common'
class ShowProfileTrainingDetails extends Component{
    render(){
        return(
            <div>
               {this.props.trainingDetails &&
                    this.props.trainingDetails.map((trainingDetails) => {
                        return (
                            <div key={trainingDetails.trainingId}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>

                                        <div className={classes.details}>
                                            <p><strong>{trainingDetails.program}</strong></p>
                                            <p>{trainingDetails.organization}({trainingDetails.location})</p>
                                            <p>{trainingDetails.dateStarted} to {trainingDetails.dateEnd}</p>
                                            <p><strong>Description:</strong>{trainingDetails.description}</p>
                                        </div>
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
export default ShowProfileTrainingDetails