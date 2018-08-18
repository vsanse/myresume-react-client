import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import commonClasses from '../common/common.css'
import { addInternshipDetails, getInternshipDetails } from '../Utils/ApiUtils'
import { reverseString } from "../common/common"
import ShowInternshipComponent from './ShowInternshipComponent'
class InternshipComponent extends Component {
    state = {

    }

    handleShowInternForm = (event) => {
        this.setState(prevState => ({
            showInternForm: !prevState.showInternForm,
            dateValidationStatus: 'success',
            dateStarted: {
                value: '',

            },
            dateEnd: {
                value: '',

            },
            profile: {
                value: '',
                validationStatus: 'success'
            },
            organization: {
                value: '',
                validationStatus: 'success'
            },
            description: {
                value: '',
                validationStatus: 'success'
            },
            location: {
                value: '',
                validationStatus: 'success'
            }
        }))
    }

    getUsersInternDetails = (username) => {
        getInternshipDetails(username)
            .then(response => {
                this.setState({
                    internDetails: [...response],
                })

            })
    }

    componentWillReceiveProps(nextProps) {
        this.getUsersInternDetails(nextProps.username);
    }

    handleInternSubmit = (event) => {
        event.preventDefault();
        const internDetails = {
            dateStarted: reverseString(this.state.dateStarted.value),
            dateEnd: reverseString(this.state.dateEnd.value),
            description: this.state.description.value,
            location: this.state.location.value,
            profile: this.state.profile.value,
            organization: this.state.organization.value
        }

        addInternshipDetails(internDetails)
            .then(response => {
                this.getUsersInternDetails(this.props.username)
                this.handleShowInternForm()
            }).catch(error => {
                console.log("Something wen wrong while adding details")
            });

    }


    handleSubmitDisable = (event) => {
        if (this.state.profile.validationStatus === 'success' &&
            this.state.dateValidationStatus === 'success' &&
            this.state.description.validationStatus === 'success' &&
            this.state.location.validationStatus === 'success' &&
            this.state.organization.validationStatus === 'success'
        ) {
            return false
        }
        return true
    }

    handleChange = (event, validation) => {
        const targetValue = event.target.value
        const targetName = event.target.name
        if (!validation) {
            this.setState({
                [targetName]: {
                    value: targetValue
                }
            })
        }
        this.setState({
            [targetName]: {
                value: targetValue,
                ...validation(targetValue)
            }
        })
    }
    render() {

        return (
            <div>
                <div className={classes.education} >
                    <div className={classes.eduHeading}>
                        <div className={classes.heading}>
                            <strong>INTERNSHIPS:</strong>
                        </div>
                        <div className={classes.icon} >
                            <i className="fas fa-plus fa-1x" onClick={this.handleShowInternForm}></i>
                        </div>
                    </div>
                    <hr />
                    <ShowInternshipComponent action={() => this.getUsersInternDetails(this.props.username)} internDetails={this.state.internDetails} />


                </div>
                {
                    this.state.showInternForm &&
                    <div className={classes.modal}>

                        <div className={classes.modal_content} >
                            <div className={classes.modal_heading}>
                                Internship Details
                            <hr />
                            </div>
                            <form className={classes.formBox} onSubmit={this.handleInternSubmit} >
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Profile:
                                    <input type="text" name='profile' placeholder='Sales and  Marketing' value={this.state.profile.value} onChange={(event) => this.handleChange(event, this.validateText)} required />
                                    <i>{this.state.profile.errorMessage}</i>
                                </label>
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Start-Date:
                                    <input type="date" name='dateStarted' id='txtStartDate' placeholder='' value={this.state.dateStarted.value} onChange={(event) => this.handleChange(event, this.dateCheck)} required />
                                    <i>{this.state.startDateErrorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    End-Date:
                                    <input type="date" name='dateEnd' id='txtEndDate' placeholder='' value={this.state.dateEnd.value} onChange={(event) => this.handleChange(event, this.dateCheck)} required />
                                    <i>{this.state.dateErrorMessage}</i>
                                </label>
                                
                                <input type="checkbox" className={classes.checkbox} /> Is going on
                               
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Description:
                                    <textarea type="text" name='description' placeholder='Short description about internship (Max 250 chars)' maxLength='250' value={this.state.description.value} onChange={(event) => this.handleChange(event, this.validateText)} required></textarea>
                                    <i>{this.state.description.errorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Location:
                                    <input type="text" name='location' placeholder='Noida' value={this.state.location.value} onChange={(event) => this.handleChange(event, this.validateText)} required />
                                    <i>{this.state.location.errorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Organization:
                                    <input type="text" name='organization' placeholder='HCL Technology' value={this.state.organization.value} onChange={(event) => this.handleChange(event, this.validateText)} required />
                                    <i>{this.state.organization.errorMessage}</i>
                                </label>


                                <button className={classes.cancelbtn} onClick={this.handleShowInternForm}> Cancel</button>
                                <button type="submit" className={classes.buttonSave} disabled={this.handleSubmitDisable()} >Save</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        )
    }


    validateText = (text) => {
        const degreeREGEX = RegExp('^[a-zA-Z]+[a-zA-Z ]*$');
        if (!degreeREGEX.test(text)) {
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter albhabets only and leading spaces are not allowed',
            }

        }
        else {
            return {
                validationStatus: 'success',
                errorMessage: '',
            }
        }

    }


    dateCheck = (date) => {
        const today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        const currentDate = yyyy + '-' + mm + '-' + dd
        const StartDate = document.getElementById('txtStartDate').value
        const EndDate = document.getElementById('txtEndDate').value

        if (StartDate > currentDate) {
            this.setState({
                dateValidationStatus: 'error',
                startDateErrorMessage: 'Start Date cannot be in future ',
            })
        }
        else {
            this.setState({
                dateValidationStatus: 'success',
                startDateErrorMessage: '',
            })

        }

        if (EndDate !== "" && (EndDate > StartDate)) {
            this.setState({
                dateValidationStatus: 'success',
                dateErrorMessage: '',
            })
        }

        else if (StartDate !== "" && EndDate !== "" && EndDate < StartDate) {
            this.setState({
                dateValidationStatus: 'error',
                dateErrorMessage: 'End Date must be greater then Start Date',
            })

        }

    }

}
export default InternshipComponent
