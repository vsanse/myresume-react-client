import React, { Component } from 'react';
import classes from './Profile.css';
import userinfoClasses from '../Users/CurrentUser/CurrentUser.css'
import educationClasses from '../EducationComponent/EducationComponent.css'
import { getProfile } from '../Utils/ApiUtils'
import ShowProfileEducationDetails from '../EducationComponent/ShowProfileEducationDetails';
import ShowProfileInternshipComponent from '../InternshipComponent/ShowProfileInternshipDetails';
import ShowProfileSkillComponent from '../SkillsComponent/ShowProfileSkillDetails'
class Profile extends Component {

    state = {

    }

    getUserProfile = (username) => {
        getProfile(username)
            .then(profile => {
                console.log(profile)
                this.setState({
                    userInfo: profile.userinfo,
                    educationDetails: profile.educationDetails,
                    internshipDetails:profile.internshipDetails,
                    skillsDetails:profile.skillDetails
                })
            }).catch(error => {
                if (error.errorCode === 'ERx004') {
                    this.setState({
                        profileFound: {
                            status: "Not Found",
                            message: "User " + username + " doesn't exists! Please try another name"
                        }
                    })
                }
            });
    }

    componentDidMount() {
        this.getUserProfile(this.props.match.params.username)
    }

    render() {
            console.log(this.profile)
        return (
    
            <div className={classes.overflow_handle}>
                {
                    this.state.userInfo &&
                    <div className={userinfoClasses.userinfo+" "+classes.userinfo}>
                        <div className={userinfoClasses.name}><strong>{this.state.userInfo.firstName}<span> {this.state.userInfo.lastName}</span></strong></div>
                        <div className={userinfoClasses.work}>{this.state.userInfo.designation} at <span> {this.state.userInfo.currentOrganization}</span></div>
                        <div className={userinfoClasses.icon}>
                            <a href={"mailto:" + this.state.userInfo.email} className={userinfoClasses.email}><i className="fas fa-envelope fa-1x"></i><span>{this.state.userInfo.email}</span></a>
                        </div>
                    </div>
                }
                {
                    this.state.educationDetails &&
                    this.state.educationDetails.length > 0 &&
                    <div className={educationClasses.education} >
                        <div className={educationClasses.heading}>
                            <strong>EDUCATION:</strong>
                        </div>
                        <hr className={educationClasses.hr2px} />
                        <ShowProfileEducationDetails eduDetail={this.state.educationDetails} />
                       
                    </div>
                }
                

                  {
                    this.state.skillDetails &&
                    this.state.skillDetails.length > 0 &&
                    <div className={educationClasses.education} >
                        <div className={educationClasses.heading}>
                            <strong>SKILLS:</strong>
                        </div>
                        <hr className={educationClasses.hr2px} />
                       
                        <ShowProfileSkillComponent internDetails={this.state.skillDetails}/>
                    </div>
                }

                 {
                    this.state.internshipDetails &&
                    this.state.internshipDetails.length > 0 &&
                    <div className={educationClasses.education} >
                        <div className={educationClasses.heading}>
                            <strong>INTERNSHIPS:</strong>
                        </div>
                        <hr className={educationClasses.hr2px} />
                       
                        <ShowProfileInternshipDetails internDetails={this.state.internshipDetails}/>
                    </div>
                }

                 {
                    this.state.projectDetails &&
                    this.state.projectDetails.length > 0 &&
                    <div className={educationClasses.education} >
                        <div className={educationClasses.heading}>
                            <strong>PROJECT:</strong>
                        </div>
                        <hr className={educationClasses.hr2px} />
                       
                        <ShowProfileProjectDetails projectDetails={this.state.projectDetails}/>
                    </div>
                }

                {
                    this.state.trainingDetails &&
                    this.state.trainingDetails.length > 0 &&
                    <div className={educationClasses.education} >
                        <div className={educationClasses.heading}>
                            <strong>TRAINING:</strong>
                        </div>
                        <hr className={educationClasses.hr2px} />
                       
                        <ShowProfileTrainingDetails trainingDetails={this.state.trainingDetails}/>
                    </div>
                }



                {
                    this.state.userInfo &&
                    <div className={educationClasses.education} >
                        <div className={classes.otherLinkHeading}>
                            <strong>Other Links:</strong>
                        </div>
                        <hr />
                        <div className={userinfoClasses.icon}>
                            <strong>LinkedIn : </strong>
                            <code>
                                <a href={this.state.userInfo.linkedinLink}
                                    className={classes.linkedin}>

                                    <span>{this.state.userInfo.linkedinLink}</span>
                                </a>
                            </code><br />
                            <strong>Github : </strong>
                            <code>
                                <a href={this.state.userInfo.githubLink}
                                    className={classes.github}>
                                    <span>{this.state.userInfo.githubLink}</span>
                                </a>
                            </code><br />
                        </div>
                    </div>

                }


            </div>
        )
    }
}
export default Profile;