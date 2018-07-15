import React, { Component } from 'react';
import classes from './Profile.css';
import commonClasses from '../common/common.css';
import userinfoClasses from '../Users/CurrentUser/CurrentUser.css'
import educationClasses from '../EducationComponent/EducationComponent.css'
import { getProfile } from '../Utils/ApiUtils'
import ShowProfileEducationDetails from '../EducationComponent/ShowProfileEducationDetails';

class Profile extends Component {

    state = {

    }

    getUserProfile = (username) => {
        getProfile(username)
            .then(profile => {
                this.setState({
                    userInfo: profile.userinfo,
                    educationDetails: profile.educationDetails,
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

        return (
            <div>
                {
                    this.state.userInfo &&
                    <div className={userinfoClasses.userinfo}>
                        <div className={userinfoClasses.name}><strong>{this.state.userInfo.firstName}<span> {this.state.userInfo.lastName}</span></strong></div>
                        <div className={userinfoClasses.work}>{this.state.userInfo.designation} at <span> {this.state.userInfo.currentOrganization}</span></div>
                        <div className={userinfoClasses.icon}>

                            <a href={this.state.userInfo.linkedinLink} className={classes.linkedin}><i className="fab fa-linkedin fa-1x"></i><span>{this.state.userInfo.linkedinLink}</span></a><br />
                            <a href={this.state.userInfo.githubLink} className={classes.github}><i className="fab fa-github fa-1x"></i><span>{this.state.userInfo.githubLink}</span></a><br />

                            <a href={"mailto:" + this.state.userInfo.email} className={userinfoClasses.email}><i className="fas fa-envelope fa-1x"></i><span>{this.state.userInfo.email}</span></a>
                        </div>
                    </div>
                }
                {
                    this.state.educationDetails &&
                    <div className={educationClasses.education} >
                        <div className={educationClasses.eduHeading}>
                            <div className={educationClasses.heading}>
                                <strong>EDUCATION:</strong>
                            </div>
                        </div>
                        <hr className={educationClasses.hr2px}/>
                        <ShowProfileEducationDetails eduDetail={this.state.educationDetails}/>
                    </div>
                }

            </div>
        )
    }
}
export default Profile;