import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import commonClasses from '../common/common.css'
import {addInternshipDetails , getInternshipDetails} from '../Utils/ApiUtils'
import  {reverseString} from "../common/common"
class InternshipComponent extends Component {
    state = {

    }

    handleShowInternForm = (event) => {
        this.setState(prevState => ({
            showInternForm: !prevState.showInternForm,
            dateStarted:{
                value:''
            },
            dateEnd:{
                value:''
            },
            profile:{
                value:''
            },
            organization:{
                value:''
            },
            description:{
                value:''
            },
            location:{
                value:''
            }
        }))
    }

    getUsersInternDetails = (username) =>{
        getInternshipDetails(username)
        .then(response =>{
            this.setState({
                internDetails:[...response],

            })
            
        })
    }

    handleInternSubmit=(event)=>{
        event.preventDefault();
        const internDetails = {
            dateStarted:this.state.dateStarted.value,
            dateEnd: this.state.dateEnd.value,
            description: this.state.description.value,
            location: this.state.location.value,
            profile: this.state.profile.value,
            organization: this.state.organization.value  
        } 
        console.log(typeof(internDetails.dateStarted), reverseString(internDetails.dateStarted))
        addInternshipDetails(internDetails)
            .then(response => {
                console.log(response)
                
            }).catch(error=>{
                console.log(error)
            });
            
    }

    handleChange=(event)=>{
        const targetValue= event.target.value
        const targetName = event.target.name
        this.setState({
             [targetName]:{
                value:targetValue
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
                        {
                            this.getUsersInternDetails(this.props.username)  &&
                            <div>{this.state.internDetails.description.value}</div>
                        }
                      
                    </div>
                    <hr />
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
                                    Start-Date:
                                    <input type="date" name='dateStarted' placeholder='' value={this.state.dateStarted.value} onChange={this.handleChange} required/>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    End-Date:
                                    <input type="date" name='dateEnd' placeholder='' value={this.state.dateEnd.value} onChange={this.handleChange} required/>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Description:
                                    <input type="text" name='description' placeholder='' value={this.state.description.value} onChange={this.handleChange} required/>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Location:
                                    <input type="text" name='location' placeholder='' value={this.state.location.value} onChange={this.handleChange} required/>
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Organization:
                                    <input type="text" name='organization' placeholder='' value={this.state.organization.value} onChange={this.handleChange} required />
                                </label>

                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Profile:
                                    <input type="text" name='profile' placeholder='' value={this.state.profile.value} onChange={this.handleChange} required />
                                </label>
                                <button className={classes.cancelbtn} onClick={this.handleShowInternForm}> Cancel</button>
                                <button type="submit" className={classes.buttonSave} >Save</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        )
    }

}
export default InternshipComponent
