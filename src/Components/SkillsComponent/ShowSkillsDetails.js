import React, { Component } from 'react';
import classes from './../EducationComponent/EducationComponent.css';
import { deleteSkillsDetails, updateSkillsDetails } from '../Utils/ApiUtils'
import commonClasses from '../common/common.css'
class ShowSkillsDetails extends Component {
    state = {
        skill: {
            value: '',
            id: '',

        }
    }

    handleEditForm = (event, skills) => {
        this.setState(prevState => ({
            showEditSkillForm: !prevState.showEditSkillForm,
            skill: {
                value: skills.skill,
                id: skills.skillId,
                validationStatus: 'success'
            }
        }))

    }

    handleDeleteForm = (event, skills) => {
        this.setState(prevState => ({
            showDeleteForm: !prevState.showDeleteForm,
            showDeleteId: skills.skillId,
        }))
    }

    handleEditSave = (event) => {
        if (this.state.skill.validationStatus === 'success') {
            return false
        }
        return true
    }

    handleChangeEdit = (event, validation) => {
        const targetValue = event.target.value
        const targetId = event.target.id
        if (!validation) {
            this.setState({
                skill: {
                    value: targetValue,
                    id: targetId,
                }
            })
        }
        this.setState({
            skill: {
                value: targetValue,
                id: targetId,
                ...validation(targetValue)
            }
        })
    }

    handleSkillUpdate = (event, skills) => {
        event.preventDefault();
        const skillDetails = {
            skill: this.state.skill.value,
            skillId: this.state.skill.id
        }
        updateSkillsDetails(skillDetails)
            .then(response => {
                this.handleEditForm(event, skills)
                this.props.event();
            })


    }

    deleteSkillDetails = (event, skill) => {
        event.preventDefault();
        const id = skill
        deleteSkillsDetails(id)
            .then(response => {

                this.props.action();
            })

    }

    render() {
        return (
            <div>

                {this.props.skillsDetail &&
                    this.props.skillsDetail.map((skills) => {
                        return (
                            <div key={skills.skillId}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>
                                        <div className={classes.details}>
                                            <div >{skills.skill}</div>
                                        </div>
                                    </div>
                                    <div className={classes.editEduDetailsIcons} >
                                        <i className={"fas fa-edit " + classes.editIcon} onClick={(event) => this.handleEditForm(event, skills)} ></i>
                                        <i className={"far fa-trash-alt"} onClick={(event) => this.handleDeleteForm(event, skills)} ></i>
                                    </div>
                                </div>
                                {this.state.showEditSkillForm &&
                                    <div className={classes.modal}>
                                        <div className={classes.modal_content} >
                                            <div className={classes.modal_heading}>
                                                Skill Details
                                                <hr />
                                            </div>
                                            <form className={classes.formBox} onSubmit={(event) => this.handleSkillUpdate(event, skills)}>
                                                <label className={commonClasses.label + " " + classes.modal_label}>
                                                    Enter A Skill:
                                                        <input id={this.state.skill.id} type='text' value={this.state.skill.value} onChange={(event) => this.handleChangeEdit(event, this.validateText)} required />
                                                    <i>{this.state.skill.errorMessage}</i>
                                                </label>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleEditForm(event, skills)} > Cancel</button>
                                                <button type="submit" className={classes.buttonSave} disabled={this.handleEditSave()}>Save</button>
                                            </form>
                                        </div>
                                    </div>
                                }
                                {skills.skillId === this.state.showDeleteId &&
                                    this.state.showDeleteForm &&
                                    <div className={classes.modal} >
                                        <div className={classes.modal_content} >
                                            <p className={classes.deleteMessage}><strong>Do you really want to delete ?</strong></p>
                                            <div className={classes.deleteBox}>
                                                <button className={classes.cancelbtn} onClick={(event) => this.handleDeleteForm(event, skills)} > Cancel</button>
                                                <button type="submit" className={classes.buttonDelete} onClick={event => this.deleteSkillDetails(event, skills.skillId)} >Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>

                        );
                    })
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


}
export default ShowSkillsDetails;