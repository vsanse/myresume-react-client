import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';
import { deleteTrainingDetails, updateTrainingDetails } from '../Utils/ApiUtils'
import commonClasses from '../common/common.css'
import { reverseString } from '../common/common'
class ShowTrainingComponent extends Component {
    state = {
        dateStarted: {
            value: ''
        },
        dateEnd: {
            value: ''
        },
        program: {
            value: ''
        },
        organization: {
            value: ''
        },
        description: {
            value: ''
        },
        location: {
            value: ''
        }
    }

    handleEditForm = (event, trainingDetails) => {
        this.setState(prevState => ({
            showEditTrainingForm: !prevState.showEditTrainingForm,
            dateValidationStatus: 'success',
            trainingId: {
                value: trainingDetails.trainingId,

            },
            dateStarted: {
                value: reverseString(trainingDetails.dateStarted),
            },
            dateEnd: {
                value: reverseString(trainingDetails.dateEnd),
            },
            program: {
                value: trainingDetails.program,
                validationStatus: 'success'

            },
            organization: {
                value: trainingDetails.organization,
                validationStatus: 'success'
            },
            description: {
                value: trainingDetails.description,
                validationStatus: 'success'
            },
            location: {
                value: trainingDetails.location,
                validationStatus: 'success'
            }

        }))

    }

    handleEditSave = (event) => {
        if (this.state.program.validationStatus === 'success' &&
            this.state.dateValidationStatus === 'success' &&
            this.state.description.validationStatus === 'success' &&
            this.state.location.validationStatus === 'success' &&
            this.state.organization.validationStatus === 'success'
        ) {
            return false
        }
        return true
    }

    handleUpdateTraining = (event) => {
        event.preventDefault();
        const trainingDetails = {
            trainingId: this.state.trainingId.value,
            dateStarted: reverseString(this.state.dateStarted.value),
            dateEnd: reverseString(this.state.dateEnd.value),
            description: this.state.description.value,
            location: this.state.location.value,
            program: this.state.program.value,
            organization: this.state.organization.value
        }
        updateTrainingDetails(trainingDetails)
            .then(response => {
                this.setState(prevState => ({
                    showEditTrainingForm: !prevState.showEditTrainingForm
                }));
                this.props.action();
            })
            .catch(error => {
                console.log(error)

            })

    }

    handleChangeEdit = (event, validation) => {
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

    handleDeleteForm = (event, trainingId) => {
        this.setState(prevState => ({
            showDeleteForm: !prevState.showDeleteForm,
            showDeleteId: trainingId,
        }))
    }

    deleteTrainingDetails = (event, trainingId) => {
        event.preventDefault();
        const id = trainingId
        deleteTrainingDetails(id)
            .then(response => {
                this.props.action();
            })

    }

    render() {
        return (
            <div>
                {this.props.trainingDetails &&
                    this.props.trainingDetails.map((trainingDetails) => {
                        return (
                            <div key={trainingDetails.trainingId}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>

                                        <div className={classes.details}>
                                            <li>
                                                <p><strong>{trainingDetails.program}</strong></p>
                                                <p>{trainingDetails.organization}({trainingDetails.location})</p>
                                                <p>{trainingDetails.dateStarted} to {trainingDetails.dateEnd}</p>
                                                <p><strong>Description:</strong>{trainingDetails.description}</p>
                                            </li>
                                        </div>
                                    </div>
                                    <div className={classes.editEduDetailsIcons} >
                                        <i className={"fas fa-edit " + classes.editIcon} onClick={(event) => this.handleEditForm(event, trainingDetails)} ></i>
                                        <i className={"far fa-trash-alt"} onClick={(event) => this.handleDeleteForm(event, trainingDetails.trainingId)} ></i>
                                    </div>
                                </div>

                                {this.state.showEditTrainingForm &&
                                    <div className={classes.modal}>
                                        <div className={classes.modal_content} >
                                            <div className={classes.modal_heading}>
                                                Training Details
                                                <hr />
                                            </div>
                                            <form className={classes.formBox} onSubmit={(event) => this.handleUpdateTraining(event, trainingDetails)}>

                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Start-Date:
                                    <input type="date" name='dateStarted' id='txtStartDate' placeholder='' value={this.state.dateStarted.value} onChange={(event) => this.handleChangeEdit(event, this.dateCheck)} required />
                                                    <i>{this.state.startDateErrorMessage}</i>
                                                </label>

                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    End-Date:
                                    <input type="date" name='dateEnd' id='txtEndDate' placeholder='' value={this.state.dateEnd.value} onChange={(event) => this.handleChangeEdit(event, this.dateCheck)} required />
                                                    <i>{this.state.dateErrorMessage}</i>
                                                </label>

                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Description:
                                                    <textarea type="text" name='description' placeholder='Short description about Training (Max 250 chars)' maxLength="250" value={this.state.description.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required ></textarea>
                                                    <i>{this.state.description.errorMessage}</i>
                                                </label>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Location:
                                                    <input type="text" name='location' placeholder='Noida' value={this.state.location.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required />
                                                    <i>{this.state.location.errorMessage}</i>
                                                </label>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Organization:
                                                    <input type="text" name='organization' placeholder='IBM Trainings' value={this.state.organization.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required />
                                                    <i>{this.state.organization.errorMessage}</i>
                                                </label>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Program:
                                                    <input type="text" name='program' placeholder='Analytics' value={this.state.program.value} onChange={(event) => this.handleChangeEdit(event, this.validateProgram)} required />
                                                    <i>{this.state.program.errorMessage}</i>
                                                </label>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleEditForm(event, trainingDetails)} > Cancel</button>
                                                <button type="submit" className={classes.buttonSave} disabled={this.handleEditSave()} >Save</button>
                                            </form>
                                        </div>
                                    </div>
                                }

                                {trainingDetails.trainingId === this.state.showDeleteId &&
                                    this.state.showDeleteForm &&
                                    <div className={classes.modal} >
                                        <div className={classes.modal_content} >
                                            <p className={classes.deleteMessage}><strong>Do you really want to delete ?</strong></p>
                                            <div className={classes.deleteBox}>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleDeleteForm(event, trainingDetails.trainingId)} > Cancel</button>
                                                <button type="submit" className={classes.buttonDelete} onClick={event => this.deleteTrainingDetails(event, trainingDetails.trainingId)} >Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    validateProgram = (text) => {
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
    validateText = (text) => {
        const degreeREGEX = RegExp('^[a-zA-Z]+[a-zA-Z .)(,]*$');
        if (!degreeREGEX.test(text)) {
            return {
                validationStatus: 'error',
                errorMessage: 'Alphabets,spaces and commas,fullstop and brackets are not allowed and leading spaces and commas,fullstop and brackets are not allowed ',
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
export default ShowTrainingComponent;