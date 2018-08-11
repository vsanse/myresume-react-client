import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';
import { deleteInternshipDetails, updateInternshipDetails } from '../Utils/ApiUtils'
import commonClasses from '../common/common.css'
import { reverseString } from '../common/common'
class ShowInternshipComponent extends Component {
    state = {
        dateStarted: {
            value: ''
        },
        dateEnd: {
            value: ''
        },
        profile: {
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

    handleEditForm = (event, internDetails) => {
        this.setState(prevState => ({
            showEditInternForm: !prevState.showEditInternForm,
            dateValidationStatus:'success',
            internId: {
                value: internDetails.internId,

            },
            dateStarted: {
                value: reverseString(internDetails.dateStarted),    
            },
            dateEnd: {
                value: reverseString(internDetails.dateEnd),
            },
            profile: {
                value: internDetails.profile,
                validationStatus: 'success'

            },
            organization: {
                value: internDetails.organization,
                validationStatus: 'success'
            },
            description: {
                value: internDetails.description,
                validationStatus: 'success'
            },
            location: {
                value: internDetails.location,
                validationStatus: 'success'
            }

        }))

    }

    handleEditSave = (event) => {
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

    handleUpdateInternship = (event) => {
        event.preventDefault();
        const internDetails = {
            internId: this.state.internId.value,
            dateStarted: reverseString(this.state.dateStarted.value),
            dateEnd: reverseString(this.state.dateEnd.value),
            description: this.state.description.value,
            location: this.state.location.value,
            profile: this.state.profile.value,
            organization: this.state.organization.value
        }
        updateInternshipDetails(internDetails)
            .then(response => {
                this.setState(prevState => ({
                    showEditInternForm: !prevState.showEditInternForm
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

    handleDeleteForm = (event, internId) => {
        this.setState(prevState => ({
            showDeleteForm: !prevState.showDeleteForm,
            showDeleteId: internId,
        }))
    }

    deleteInternDetails = (event, internId) => {
        event.preventDefault();
        const id = internId
        deleteInternshipDetails(id)
            .then(response => {
                this.props.action();
            })

    }

    render() {
        return (
            <div>
                {this.props.internDetails &&
                    this.props.internDetails.map((internDetails) => {
                        return (
                            <div key={internDetails.internId}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>

                                        <div className={classes.details}>
                                            <p><strong>{internDetails.profile}</strong></p>
                                            <p>{internDetails.organization}({internDetails.location})</p>
                                            <p>{internDetails.dateStarted} to {internDetails.dateEnd}</p>
                                            <p><strong>Description:</strong>{internDetails.description}</p>
                                        </div>
                                    </div>
                                    <div className={classes.editEduDetailsIcons} >
                                        <i className={"fas fa-edit " + classes.editIcon} onClick={(event) => this.handleEditForm(event, internDetails)} ></i>
                                        <i className={"far fa-trash-alt"} onClick={(event) => this.handleDeleteForm(event, internDetails.internId)} ></i>
                                    </div>
                                </div>

                                {this.state.showEditInternForm &&
                                    <div className={classes.modal}>
                                        <div className={classes.modal_content} >
                                            <div className={classes.modal_heading}>
                                                Internship Details
                                                <hr />
                                            </div>
                                            <form className={classes.formBox} onSubmit={(event) => this.handleUpdateInternship(event, internDetails)}>
                                            <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Profile:
                                                    <input type="text" name='profile' placeholder='Sales and Marketing' value={this.state.profile.value} onChange={(event) => this.handleChangeEdit(event, this.validateProfile)} required />
                                                    <i>{this.state.profile.errorMessage}</i>
                                                </label>
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
                                                    <textarea type="text" name='description' placeholder='Short description about internship (max 250 chars) ' maxLength='250' value={this.state.description.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required></textarea>
                                                    <i>{this.state.description.errorMessage}</i>
                                                </label>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Location:
                                                    <input type="text" name='location' placeholder='Noida' value={this.state.location.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required />
                                                    <i>{this.state.location.errorMessage}</i>
                                                </label>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Organization:
                                                    <input type="text" name='organization' placeholder='HCL Technology' value={this.state.organization.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required />
                                                    <i>{this.state.organization.errorMessage}</i>
                                                </label>
                                                
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleEditForm(event, internDetails)} > Cancel</button>
                                                <button type="submit" className={classes.buttonSave} disabled={this.handleEditSave()} >Save</button>
                                            </form>
                                        </div>
                                    </div>
                                }

                                {internDetails.internId === this.state.showDeleteId &&
                                    this.state.showDeleteForm &&
                                    <div className={classes.modal} >
                                        <div className={classes.modal_content} >
                                            <p className={classes.deleteMessage}><strong>Do you really want to delete ?</strong></p>
                                            <div className={classes.deleteBox}>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleDeleteForm(event, internDetails.internId)} > Cancel</button>
                                                <button type="submit" className={classes.buttonDelete} onClick={event => this.deleteInternDetails(event, internDetails.internId)} >Delete</button>
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

    validateProfile= (text) => {
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
        let mm = today.getMonth()+1
        let yyyy = today.getFullYear()
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm = '0'+mm
        }
        const currentDate = yyyy+ '-'+ mm + '-'+ dd
        const StartDate = document.getElementById('txtStartDate').value
        const EndDate = document.getElementById('txtEndDate').value

        if(StartDate > currentDate){
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

        if( EndDate !=="" && (EndDate > StartDate)){
           this.setState({ 
                dateValidationStatus: 'success',
                dateErrorMessage: '',
            })
        }
       
        else if(StartDate!=="" && EndDate!=="" && EndDate < StartDate)  {
            this.setState({ 
                dateValidationStatus: 'error',
                dateErrorMessage: 'End Date must be greater then Start Date',
            })
               
        }

    }


}
export default ShowInternshipComponent;