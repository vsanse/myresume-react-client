import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';
class ShowProfileProjectDetails extends Component{
    render(){
        return(
            <div>
                 {this.props.projectDetails &&
                    this.props.projectDetails.map((projectDetails) => {
                        return (
                            <div key={projectDetails.pid}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>

                                        <div className={classes.details}>
                                            <p><strong>{projectDetails.title}</strong></p>
                                            <p>{projectDetails.startDate} to {projectDetails.endDate}</p>
                                            <p><strong>Description:</strong>{projectDetails.description}</p>
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
export default ShowProfileProjectDetails