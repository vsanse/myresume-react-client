import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import commonClasses from '../common/common.css'
import {addAdditionalInfoDetails, getAdditionalInfoDetails} from '../Utils/ApiUtils'
import ShowAdditionalInfoComponent from './ShowAdditionalInformation'
class AdditionalInfoComponent extends Component {
    state = {

    }

    handleShowAdditionalInfoForm = (event) => {
       
        this.setState(prevState => ({
            showAdditionalInfoForm: !prevState.showAdditionalInfoForm,
            description:{
                value:'',
               
            }  
        }))
    }

    getUsersAdditionalDetails = (username) =>{
        getAdditionalInfoDetails(username)
        .then(response =>{
            this.setState({
                additionalInfoDetails:[...response],
            })
          
        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentWillReceiveProps(nextProps){
        this.getUsersAdditionalDetails(nextProps.username);
    }

    handleAdditionalInfoSubmit=(event)=>{
        event.preventDefault();
        const additionalInfoDetails = {
            description: this.state.description.value, 
        } 
         
        addAdditionalInfoDetails(additionalInfoDetails)
            .then(response => {
                
                this.getUsersAdditionalDetails(this.props.username)
                this.handleShowAdditionalInfoForm()
            }).catch(error=>{
                console.log(error)
              
            });
            
    }


    handleSubmitDisable= (event) => {
        if (
            this.state.description.validationStatus === 'success'
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
                            <strong>ADDITIONAL DETAILS:</strong>
                        </div>
                        <div className={classes.icon} >
                            <i className="fas fa-plus fa-1x" onClick={this.handleShowAdditionalInfoForm}></i>
                        </div>       
                    </div>
                    <hr />
                    <ShowAdditionalInfoComponent action={()=>this.getUsersAdditionalDetails(this.props.username)} additionalInfoDetails={this.state.additionalInfoDetails}/>
                    
                   
                </div>
                {
                    this.state.showAdditionalInfoForm &&
                    <div className={classes.modal}>

                        <div className={classes.modal_content} >
                            <div className={classes.modal_heading}>
                                Addtional Details
                            <hr />
                            </div>
                            <form className={classes.formBox} onSubmit={this.handleAdditionalInfoSubmit} >
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Description:
                                    <textarea name='description' placeholder='Add details here (Max 250 chars)' maxLength='250' value={this.state.description.value} onChange={(event) => this.handleChange(event, this.validateText)}required></textarea>
                                    <i>{this.state.description.errorMessage}</i>
                                </label>
                                <button type='cancel'className={classes.cancelbtn} onClick={this.handleShowAdditionalInfoForm}> Cancel</button>
                                <button  type="submit" className={classes.buttonSave} disabled={this.handleSubmitDisable()} >Save</button>
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
export default AdditionalInfoComponent