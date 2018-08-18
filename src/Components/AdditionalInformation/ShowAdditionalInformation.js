import React, { Component } from 'react'
import classes from './../EducationComponent/EducationComponent.css';
import { deleteAdditionalInfoDetails, updateAdditionalInfoDetails } from '../Utils/ApiUtils'
import commonClasses from '../common/common.css'
class ShowAddtionalInfoComponent extends Component {
    state = {
        addid:{
            value:''
        },
        description: {
            value: ''
        },
       
    }

    handleEditForm = (event, additionalInfoDetails) => {
        this.setState(prevState => ({
            showEditAdditionalInfoForm: !prevState.showEditAdditionalInfoForm,
        
            addid: {
                value: additionalInfoDetails.addid,
            },
            description: {
                value: additionalInfoDetails.description,
                validationStatus: 'success'
            },
           

        }))

    }

    handleEditSave = (event) => {
        if (
            this.state.description.validationStatus === 'success'
            
        ) {
            return false
        }
        return true
    }

    handleUpdateAdditionalInfo= (event) => {
        event.preventDefault();
        const additionalInfoDetails = {
            addid: this.state.addid.value,
            description: this.state.description.value,
           
        }
        updateAdditionalInfoDetails(additionalInfoDetails)
            .then(response => {
               
                this.setState(prevState => ({
                    showEditAdditionalInfoForm: !prevState.showEditAdditionalInfoForm
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

    handleDeleteForm = (event, addid) => {
        this.setState(prevState => ({
            showDeleteForm: !prevState.showDeleteForm,
            showDeleteId: addid,
        }))
    }

    deleteAdditionalInfoDetails = (event, addid) => {
        event.preventDefault();
        const id = addid
        deleteAdditionalInfoDetails(id)
            .then(response => {
                this.props.action();
            })

    }

    render() {
       
        return (
            <div>
                
                {this.props.additionalInfoDetails &&
                    this.props.additionalInfoDetails.map((additionalInfoDetails) => {
                        return (
                            <div key={additionalInfoDetails.addid}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>

                                        <div className={classes.details}>
                                            <li>{additionalInfoDetails.description}</li>
                                        </div>
                                    </div>
                                    <div className={classes.editEduDetailsIcons} >
                                        <i className={"fas fa-edit " + classes.editIcon} onClick={(event) => this.handleEditForm(event, additionalInfoDetails)} ></i>
                                        <i className={"far fa-trash-alt"} onClick={(event) => this.handleDeleteForm(event, additionalInfoDetails.addid)} ></i>
                                    </div>
                                </div>

                                {this.state.showEditAdditionalInfoForm &&
                                    <div className={classes.modal}>
                                        <div className={classes.modal_content} >
                                            <div className={classes.modal_heading}>
                                               Additional Details
                                                <hr />
                                            </div>
                                            <form className={classes.formBox} onSubmit={(event) => this.handleUpdateAdditionalInfo(event, additionalInfoDetails)}>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Description:
                                                    <textarea type="text" name='description' placeholder='Add details here (Max 250 chars)' maxLength='250' value={this.state.description.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required ></textarea>
                                                    <i>{this.state.description.errorMessage}</i>
                                                </label>
                                              
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleEditForm(event, additionalInfoDetails)} > Cancel</button>
                                                <button type="submit" className={classes.buttonSave} disabled={this.handleEditSave()} >Save</button>
                                            </form>
                                        </div>
                                    </div>
                                }

                                {additionalInfoDetails.addid === this.state.showDeleteId &&
                                    this.state.showDeleteForm &&
                                    <div className={classes.modal} >
                                        <div className={classes.modal_content} >
                                            <p className={classes.deleteMessage}><strong>Do you really want to delete ?</strong></p>
                                            <div className={classes.deleteBox}>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleDeleteForm(event, additionalInfoDetails.addid)} > Cancel</button>
                                                <button type="submit" className={classes.buttonDelete} onClick={event => this.deleteAdditionalInfoDetails(event, additionalInfoDetails.addid)} >Delete</button>
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
    


}
export default ShowAddtionalInfoComponent;