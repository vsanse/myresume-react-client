import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import { addSkillsDetails, getSkillsDetails } from '../Utils/ApiUtils';
import commonClasses from '../common/common.css'
import ShowSkillsDetails from './ShowSkillsDetails'
class SkillsComponent extends Component {
    state = {

    }


    handleShowSkillForm = (event) => {
        this.setState(prevState => ({
            showSkillsForm: !prevState.showSkillsForm,
            skill: {
                value: ''
            }
        }))


    }
    handleChange = (event) => {
        const targetValue = event.target.value
        this.setState({
            skill: {
                value: targetValue,
            }
        })

    }

    handleSubmitSkills = (event) => {
        event.preventDefault();
        const skillsDetails = {
            skill: this.state.skill.value,
        }
        addSkillsDetails(skillsDetails)
            .then(response => {
                this.handleShowSkillForm()
            })

    }

    getUsersSkillsDetails = (username) => {
        getSkillsDetails(username)
            .then(response => {
                this.setState({
                    skillsDetails: [...response],
                })
            })
    }

    componentWillReceiveProps(nextProps){
        this.getUsersSkillsDetails(nextProps.username);
    }


    render() {

        return (

            <div className={classes.education} >
                <div className={classes.eduHeading}>
                    <div className={classes.heading}>

                        <strong>SKILLS:</strong>
                    </div>
                    <div className={classes.icon} >
                        <i className="fas fa-plus fa-1x" onClick={this.handleShowSkillForm}></i>
                    </div>
                </div>
                <hr />
                <ShowSkillsDetails skillsDetail={this.state.skillsDetails} action={()=>this.getUsersSkillsDetails(this.props.username)} />

                {
                    this.state.showSkillsForm &&
                    <div className={classes.modal}>
                        <div className={classes.modal_content} >
                            <div className={classes.modal_heading}>
                                Skills Details
                                 <hr />
                            </div>
                            <form className={classes.formBox} onSubmit={this.handleSubmitSkills}>
                                <label className={commonClasses.label + " " + classes.modal_label}>
                                    Enter A Skill:
                                    <input type='text' value={this.state.skill.value} onChange={this.handleChange} required />
                                </label>
                                <button className={classes.cancelbtn} onClick={this.handleShowSkillForm}> Cancel</button>
                                <button type="submit" className={classes.buttonSave}  >Save</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        )
    }

}
export default SkillsComponent;