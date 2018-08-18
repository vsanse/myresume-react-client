import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';

class ShowProfileAdditionalInformationDetails extends Component {
    render() {
        return (
            <div>

                {
                    this.props.additionalInfoDetails &&
                    this.props.additionalInfoDetails.map((additionalInfoDetails) => {
                        return (
                            <div key={additionalInfoDetails.addid}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>

                                        <div className={classes.details}>
                                            <li>{additionalInfoDetails.description}</li>
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
export default ShowProfileAdditionalInformationDetails