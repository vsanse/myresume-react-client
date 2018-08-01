import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';

class ShowProfileSkillDetails extends Component {
    render() {
        return (
            <div>
                {
                    this.props.skillsDetail &&
                    this.props.skillsDetail.map((skills) => {
                        return (
                            <div key={skills.skillId}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>
                                        <div className={classes.details}>
                                            <div >{skills.skill}</div>
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
export default ShowProfileSkillDetails