import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import commonClasses from '../common/common.css'
import {addTrainingDetails , getTrainingDetails} from '../Utils/ApiUtils'
import  {reverseString} from "../common/common"
import ShowTrainingComponent from './ShowTranningComponent'
class TrainingComponent extends Component {
    state = {

    }

    handleShowTrainingForm = (event) => {
        event.preventDefault()
        this.setState(prevState => ({
            showTrainingForm: !prevState.showTrainingForm,
           
            dateStarted:{
                value:'',
              
            },
            dateEnd:{
                value:'',
               
            },
            program:{
                value:'',
            
            },
            organization:{
                value:'',
               
            },
            description:{
                value:'',
               
            },
            location:{
                value:'',
               
            }
        }))
    }

    getUsersTrainingDetails = (username) =>{
        getTrainingDetails(username)
        .then(response =>{
            this.setState({
                trainingDetails:[...response],
            })
          
        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentWillReceiveProps(nextProps){
        this.getUsersTrainingDetails(nextProps.username);
    }

    handleTrainingSubmit=(event)=>{
        event.preventDefault();
        const trainingDetails = {
            dateStarted:reverseString(this.state.dateStarted.value),
            dateEnd: reverseString(this.state.dateEnd.value),
            description: this.state.description.value,
            location: this.state.location.value,
            program: this.state.program.value,
            organization: this.state.organization.value  
        } 
      
        addTrainingDetails(trainingDetails)
            .then(response => {
                this.getUsersTrainingDetails(this.props.username)
                this.handleShowTrainingForm()
            }).catch(error=>{
                console.log(error)
               console.log("Something wen wrong while adding details")
            });
            
    }


    handleSubmitDisable= (event) => {
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

    handleChange=(event , validation)=>{
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
                            <strong>Training:</strong>
                        </div>
                        <div className={classes.icon} >
                            <i className="fas fa-plus fa-1x" onClick={this.handleShowTrainingForm}></i>
                        </div>       
                    </div>
                    <hr />
                    <ShowTrainingComponent action={()=>this.getUsersTrainingDetails(this.props.username)} trainingDetails={this.state.trainingDetails}/>
                    
                   
                </div>
                {
                    this.state.showTrainingForm &&
                    <div className={classes.modal}>

                        <div className={classes.modal_content} >
                            <div className={classes.modal_heading}>
                                Training Details
                            <hr />
                            </div>
                            <form className={classes.formBox} onSubmit={this.handleTrainingSubmit} >

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Start-Date:
                                    <input type="date" name='dateStarted' id = 'txtStartDate' placeholder='' value={this.state.dateStarted.value} onChange={(event) => this.handleChange(event, this.dateCheck)} required/>       
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    End-Date:
                                    <input type="date" name='dateEnd' id = 'txtEndDate'  placeholder='' value={this.state.dateEnd.value}  onChange={(event) => this.handleChange(event, this.dateCheck)}required/>
                                    <i>{this.state.dateErrorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Description:
                                    <input type="text" name='description' placeholder='' value={this.state.description.value}  onChange={(event) => this.handleChange(event, this.validateText)}required/>
                                    <i>{this.state.description.errorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Location:
                                    <input type="text" name='location' placeholder='' value={this.state.location.value}  onChange={(event) => this.handleChange(event, this.validateText)}required/>
                                    <i>{this.state.location.errorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Organization:
                                    <input type="text" name='organization' placeholder='' value={this.state.organization.value}  onChange={(event) => this.handleChange(event, this.validateText)} required />
                                    <i>{this.state.organization.errorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Program:
                                    <input type="text" name='program' placeholder='' value={this.state.program.value}  onChange={(event) => this.handleChange(event, this.validateText)} required />
                                    <i>{this.state.program.errorMessage}</i>
                                </label>
                                <button type='cancel'className={classes.cancelbtn} onClick={this.handleShowTrainingForm}> Cancel</button>
                                <button tabIndex="-1" type="submit" className={classes.buttonSave} disabled={this.handleSubmitDisable()} >Save</button>
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
       
        else if(StartDate!=="" && EndDate!=="" && EndDate < StartDate) {
            this.setState({ 
                dateValidationStatus: 'error',
                dateErrorMessage: 'End Date must be greater then Start Date',
            })
               
        }

    }

}
export default TrainingComponent