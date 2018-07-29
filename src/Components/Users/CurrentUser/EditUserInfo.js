import React, { Component } from 'react';
import eduClass from '../../EducationComponent/EducationComponent.css';
import { updateUserDetails } from '../../Utils/ApiUtils';
import commonClasses from '../../common/common.css';
import { withRouter } from 'react-router-dom';
class EditUserInfo extends Component {

    state = {
        userName:this.props.userInfo.userName,
        firstName: {
            value: this.props.userInfo.firstName
        },
        lastName: {
            value: this.props.userInfo.lastName
        },
        phoneNumber: {
            value: this.props.userInfo.phoneNumber
        },
        currentOrganization: {
            value: this.props.userInfo.currentOrganization
        },
        designation: {
            value: this.props.userInfo.designation
        },
        githubLink: {
            value: this.props.userInfo.githubLink
        },
        linkedinLink: {
            value: this.props.userInfo.linkedinLink
        },
        email: {
            value: this.props.userInfo.email
        },
        role:{
            value:this.props.userInfo.role
        }

    }


    handleUserInfoChange = (event) => {
        const targetValue = event.target.value
        const targetName = event.target.name
        this.setState({
            [targetName]: {
                value: targetValue
            }
        })

    }

    handleUpdateUserInfo = (event) => {
        event.preventDefault();
        const userDetails = {
            userName: this.state.userName,
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            phoneNumber: this.state.phoneNumber.value,
            designation: this.state.designation.value,
            currentOrganization: this.state.currentOrganization.value,
            linkedinLink: this.state.linkedinLink.value,
            githubLink: this.state.githubLink.value,
            email: this.state.email.value,
            role: this.state.role.value,

        }
        console.log(userDetails)
        updateUserDetails(userDetails)
            .then(response => {
                this.props.action()
            })
            .catch(error => {
                console.log(error)
            })
            
    }


    render() {
        return (
            <div className={eduClass.modal}>
                <div className={eduClass.modal_content}>
                    <form className={eduClass.formBox} onSubmit={this.handleUpdateUserInfo}>

                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            First Name:
                                         <input
                                name="firstName"
                                type="text"
                                placeholder="John"
                                value={this.state.firstName.value}
                                onChange={this.handleUserInfoChange}
                            />
                            <i>{this.state.firstName.errorMessage}</i>
                        </label>

                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            Last Name:
                                         <input
                                name="lastName"
                                type="text"
                                placeholder="Miller"
                                value={this.state.lastName.value}
                                onChange={this.handleUserInfoChange}
                            />
                            <i>{this.state.lastName.errorMessage}</i>
                        </label>
                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            Phone No:
                                    <input
                                name="phoneNumber"
                                type="tel"
                                pattern="^\d{10}$"
                                required
                                placeholder="1234567890"
                                title="Please enter a number phone number with 10 digits"
                                value={this.state.phoneNumber.value}
                                onChange={this.handleUserInfoChange}
                            />
                            <i>{this.state.phoneNumber.errorMessage}</i>
                        </label>
                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            Current Organization:
                                   <input
                                name="currentOrganization"
                                type="text"
                                value={this.state.currentOrganization.value}
                                placeholder="Google Inc."
                                onChange={this.handleUserInfoChange}

                            />
                            <i>{this.state.currentOrganization.errorMessage}</i>
                        </label>

                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            Designation:
                                <input
                                name="designation"
                                type="text"
                                value={this.state.designation.value}
                                placeholder="Full Stack Developer"
                                onChange={this.handleUserInfoChange}

                            />
                            <i>{this.state.designation.errorMessage}</i>
                        </label>

                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            Linkedin Link:
                                <input
                                name="linkedinLink"
                                type="url"
                                value={this.state.linkedinLink.value}
                                placeholder="https://linkedin.com/us/john"
                                onChange={this.handleUserInfoChange}

                            />
                            <i>{this.state.linkedinLink.errorMessage}</i>
                        </label>


                        <label className={commonClasses.label + " " + eduClass.modal_label}>
                            Github Link:
                                    <input
                                name="githubLink"
                                type="url"
                                value={this.state.githubLink.value}
                                placeholder="https://github.com/john-miller"
                                onChange={this.handleUserInfoChange}

                            />

                        </label>
                        <button className={eduClass.cancelbtn} onClick={this.props.action}> Cancel</button>
                        <button type="submit" className={eduClass.buttonSave}>Save</button>
                    </form>
                </div>
            </div>
        )
    }

}
export default withRouter(EditUserInfo)
