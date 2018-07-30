import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './CurrentUser.css'
import Layout from '../../../hoc/Layout';
import EditUserInfo from './EditUserInfo'
import EducationComponent from '../../EducationComponent/EducationComponent'
import SkillsComponent from '../../SkillsComponent/SkillsComponent';
import InternshipComponent from '../../InternshipComponent/InternshipComponent'
import TrainingComponent from '../../TrainingComponent/TrainingComponent'
class CurrentUser extends Component {
    state = {
        isLoggedIn: false,
        firstName: {
            value: ''
        },
        lastName: {
            value: ''
        },
        phoneNumber: {
            value: ''
        },
        currentOrganization: {
            value: ''
        },
        designation: {
            value: ''
        },
        githubLink: {
            value: ''
        },
        linkedinLink: {
            value: ''
        },
        email: {
            value: ''
        },

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== this.props.isLoggedIn && nextProps.isLoggedIn === true) {
            this.setState({
                isLoggedIn: nextProps.isLoggedIn,
                username: nextProps.userName,
                password:
                {
                    value: nextProps.password
                },
                role: {
                    value: nextProps.role
                },
                firstName: {
                    value: nextProps.firstName,
                },
                lastName: {
                    value: nextProps.lastName,
                },
                phoneNumber: {
                    value: nextProps.phoneNumber
                },
                designation: {
                    value: nextProps.designation
                },
                currentOrganization: {
                    value: nextProps.currentOrganization,
                },
                linkedinLink: {
                    value: nextProps.linkedinLink,
                },
                githubLink: {
                    value: nextProps.githubLink,
                },
                email: {
                    value: nextProps.email,
                }

            });
        }
        else {
            this.props.history.push("/")
        }
    }

    handleShowEdit = (event) => {
        this.setState(prevState => ({
            showEditUserInfo: !prevState.showEditUserInfo
        }))
        // this.props.history.push("/me");

    }

    render() {
        return (
            <Layout>
                <div className={classes.userinfo}>
                    <div className={classes.showInfo}>
                        <div className={classes.cardUserinfo}>
                            <div className={classes.name}><strong>{this.props.firstName}<span> {this.props.lastName}</span></strong></div>
                            {this.props.currentOrganization &&
                                <div className={classes.work}>{this.props.designation} at <span> {this.props.currentOrganization}</span></div>
                            }
                            <div className={classes.icon}>
                                {
                                    this.props.linkedinLink &&
                                    <a href={this.props.linkedinLink} className={classes.linkedin}><i className="fab fa-linkedin "></i></a>
                                }
                                {
                                    this.props.githubLink &&
                                    <a href={this.props.githubLink} className={classes.github}><i className="fab fa-github "></i></a>
                                }
                                <br /><a href={"mailto:" + this.props.email} className={classes.email}><i className="fas fa-envelope fa-1x"></i><span>{this.props.email}</span></a>
                            </div>
                        </div>

                        <div className={classes.editIcon} >
                            <i className="fas fa-edit fa-1x" onClick={this.handleShowEdit}></i>
                        </div>
                    </div>
                </div>
                {
                    this.state.showEditUserInfo &&
                    <EditUserInfo userInfo={this.props} action={this.handleShowEdit} />

                }
                <EducationComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username} />
                <SkillsComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username} />
                <InternshipComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username} />
                <TrainingComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username} />
            </Layout>
        )
    }
}

export default withRouter(CurrentUser);