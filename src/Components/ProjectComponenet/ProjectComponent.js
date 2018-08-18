import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import commonClasses from '../common/common.css'
import {addProjectDetails , getProjectDetails} from '../Utils/ApiUtils'
import  {reverseString} from "../common/common"
import ShowProjectComponent from './ShowProjectDetails'
class ProjectComponent extends Component {
    state = {

    }

    handleShowProjectForm = (event) => {
        this.setState(prevState => ({
            showProjectForm: !prevState.showProjectForm,
            dateValidationStatus:'success',
            startDate:{
                value:'',
              
            },
            endDate:{
                value:'',
               
            },
            projectLink:{
                value:'',
                validationStatus:'success'
            },
            title:{
                value:'',
                validationStatus:'success'
            },
            description:{
                value:'',
                validationStatus:'success'
            }
           
        }))
    }

    getUsersProjectDetails = (username) =>{
        getProjectDetails(username)
        .then(response =>{
            this.setState({
                projectDetails:[...response],
            })
          
        })
    }

    componentWillReceiveProps(nextProps){
        this.getUsersProjectDetails(nextProps.username);
    }

    handleProjectSubmit=(event)=>{
        event.preventDefault();
        const projectDetails = {
            startDate:reverseString(this.state.startDate.value),
            endDate: reverseString(this.state.endDate.value),
            description: this.state.description.value,
            projectLink: this.state.projectLink.value,
            title: this.state.title.value  
        } 
      
        addProjectDetails(projectDetails)
            .then(response => {
                this.getUsersProjectDetails(this.props.username)
                this.handleShowProjectForm()
            }).catch(error=>{
               console.log("Something wen wrong while adding details")
            });
            
    }


    handleSubmitDisable= (event) => {
        if (
            this.state.dateValidationStatus === 'success' &&
            this.state.description.validationStatus === 'success' &&
            this.state.title.validationStatus === 'success' 
            
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
                            <strong>PROJECTS:</strong>
                        </div>
                        <div className={classes.icon} >
                            <i className="fas fa-plus fa-1x" onClick={this.handleShowProjectForm}></i>
                        </div>       
                    </div>
                    <hr />
                    <ShowProjectComponent action={()=>this.getUsersProjectDetails(this.props.username)} projectDetails={this.state.projectDetails}/>
                    
                   
                </div>
                {
                    this.state.showProjectForm &&
                    <div className={classes.modal}>

                        <div className={classes.modal_content} >
                            <div className={classes.modal_heading}>
                                Project Details
                            <hr />
                            </div>
                            <form className={classes.formBox} onSubmit={this.handleProjectSubmit} >
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Title:
                                    <input type="text" name='title' placeholder='Face-Detection' value={this.state.title.value}  onChange={(event) => this.handleChange(event, this.validateText)} required />
                                    <i>{this.state.title.errorMessage}</i>
                                </label>
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Start-Date:
                                    <input type="date" name='startDate' id = 'txtStartDate' placeholder='' value={this.state.startDate.value} onChange={(event) => this.handleChange(event, this.dateCheck)} required/>       
                                    <i>{this.state.startDateErrorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    End-Date:
                                    <input type="date" name='endDate' id = 'txtEndDate'  placeholder='' value={this.state.endDate.value}  onChange={(event) => this.handleChange(event, this.dateCheck)}required/>
                                    <i>{this.state.dateErrorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Description:
                                    <textarea type="text" name='description' placeholder='Short description about project (Max 250 chars)' maxLength='250' value={this.state.description.value}  onChange={(event) => this.handleChange(event, this.validateText)}required></textarea>
                                    <i>{this.state.description.errorMessage}</i>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Link to Project:
                                    <input type="url" name='projectLink' placeholder='https://myproject.in' value={this.state.projectLink.value}  onChange={(event) => this.handleChange(event)}required/>
                                    
                                </label>

                                

                               
                                <button className={classes.cancelbtn} onClick={this.handleShowProjectForm}> Cancel</button>
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
export default ProjectComponent