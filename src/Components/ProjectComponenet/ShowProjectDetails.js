import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';
import { deleteProjectDetails, updateProjectDetails } from '../Utils/ApiUtils'
import commonClasses from '../common/common.css'
import { reverseString } from '../common/common'
class ShowProjectComponent extends Component {
    state = {
        startDate: {
            value: ''
        },
        endDate: {
            value: ''
        },
        projectLink: {
            value: ''
        },
        title: {
            value: ''
        },
        description: {
            value: ''
        }

    }

    handleEditForm = (event, projectDetails) => {
        this.setState(prevState => ({
            showEditProjectForm: !prevState.showEditProjectForm,
            dateValidationStatus: 'success',
            pid: {
                value: projectDetails.pid,

            },
            startDate: {
                value: reverseString(projectDetails.startDate),
            },
            endDate: {
                value: reverseString(projectDetails.endDate),
            },
            projectLink: {
                value: projectDetails.projectLink,
               

            },

            description: {
                value: projectDetails.description,
                validationStatus: 'success'
            },
            title: {
                value: projectDetails.title,
                validationStatus: 'success'
            }

        }))

    }

    handleEditSave = (event) => {
        if (
            this.state.dateValidationStatus === 'success' &&
            this.state.description.validationStatus === 'success' &&
            this.state.title.validationStatus === 'success'
        ) {
            return false
        }
        return true
    }

    handleUpdateProject = (event) => {
        event.preventDefault();
        const projectDetails = {
            pid: this.state.pid.value,
            startDate: reverseString(this.state.startDate.value),
           endDate: reverseString(this.state.endDate.value),
            description: this.state.description.value,
            projectLink: this.state.projectLink.value,
            title: this.state.title.value,

        }
        updateProjectDetails(projectDetails)
            .then(response => {
                this.setState(prevState => ({
                    showEditProjectForm: !prevState.showEditProjectForm
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

    handleDeleteForm = (event, pid) => {
        this.setState(prevState => ({
            showDeleteForm: !prevState.showDeleteForm,
            showDeleteId: pid,
        }))
    }

    deleteProjectDetails = (event, pid) => {
        event.preventDefault();
       
        deleteProjectDetails(pid)
            .then(response => {
                this.props.action();
            })
            .catch(error=>{
                console.log(this.props.action())
                console.log(error)
            })

    }

    render() {
        return (
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
                                    <div className={classes.editEduDetailsIcons} >
                                        <i className={"fas fa-edit " + classes.editIcon} onClick={(event) => this.handleEditForm(event, projectDetails)} ></i>
                                        <i className={"far fa-trash-alt"} onClick={(event) => this.handleDeleteForm(event, projectDetails.pid)} ></i>
                                    </div>
                                </div>

                                {this.state.showEditProjectForm &&
                                    <div className={classes.modal}>
                                        <div className={classes.modal_content} >
                                            <div className={classes.modal_heading}>
                                                Project Details
                                                <hr />
                                            </div>
                                            <form className={classes.formBox} onSubmit={(event) => this.handleUpdateProject(event, projectDetails)}>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    title:
                                                     <input type="text" name='title' placeholder='Face-Detection' value={this.state.title.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required />
                                                    <i>{this.state.title.errorMessage}</i>
                                                </label>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Start-Date:
                                                    <input type="date" name='startDate' id='txtStartDate' placeholder='' value={this.state.startDate.value} onChange={(event) => this.handleChangeEdit(event, this.dateCheck)} required />
                                                    <i>{this.state.startDateErrorMessage}</i>
                                                </label>

                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    End-Date:
                                                    <input type="date" name='endDate' id='txtEndDate' placeholder='' value={this.state.endDate.value} onChange={(event) => this.handleChangeEdit(event, this.dateCheck)} required />
                                                    <i>{this.state.dateErrorMessage}</i>
                                                </label>


                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Description:
                                                    <textarea type="text" name='description' placeholder='Short description about project (Max 250 chars)' maxLength='250' value={this.state.description.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required ></textarea>
                                                    <i>{this.state.description.errorMessage}</i>
                                                </label>

                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                   Link To Project:
                                                    <input type="text" name='projectLink' placeholder='https://myproject.in' value={this.state.projectLink.value} onChange={(event) => this.handleChangeEdit(event)} required />
                                                   
                                                </label>
                                                
                                                    
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleEditForm(event, projectDetails)} > Cancel</button>
                                                <button type="submit" className={classes.buttonSave} disabled={this.handleEditSave()} >Save</button>
                                            </form>
                                        </div>
                                    </div>
                                }

                                {projectDetails.pid === this.state.showDeleteId &&
                                    this.state.showDeleteForm &&
                                    <div className={classes.modal} >
                                        <div className={classes.modal_content} >
                                            <p className={classes.deleteMessage}><strong>Do you really want to delete ?</strong></p>
                                            <div className={classes.deleteBox}>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleDeleteForm(event, projectDetails.pid)} > Cancel</button>
                                                <button type="submit" className={classes.buttonDelete} onClick={event => this.deleteProjectDetails(event, projectDetails.pid)} >Delete</button>
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
export default ShowProjectComponent;