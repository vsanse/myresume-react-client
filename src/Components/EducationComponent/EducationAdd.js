import classes from './EducationComponent.css'
import React, { Component } from 'react';
import commonClasses from '../common/common.css';
import { CGPA10, CGPA5, PERCENT } from '../Constants/index'
import {
    SECONDARY_EDUCATION,
    SENIOR_SECONDARY_EDUCATION,
    GRADUATION,
    POST_GRADUATION,
    PHD,
    DIPLOMA,

} from '../Constants/index';
import { addEducationDetails } from '../Utils/ApiUtils';
class EducationAdd extends Component {

    state = {
        board: {
            value: '',
        },
        degree: {
            value: '',
        },
        institute: {
            value: '',
        },
        performance: {
            value: '',
        },
        performanceScale: {
            value: '',
        },
        stream: {
            value: '',
        },
        yearOfCompletion: {
            value: '',
        }
    }

    handleChange = (event, validation) => {
        const targetValue = event.target.value
        const targetName = event.target.name
        if (!validation)
            this.setState({
                [targetName]: {
                    value: targetValue,
                }

            })
        else {
            this.setState({
                [targetName]: {
                    value: targetValue,
                    ...validation(targetValue)
                },

            })
        }
    }
    isFormInvalid = () => {
        console.log(this.state.board.validationStatus,
            this.state.performance.validationStatus,
            this.state.stream.validationStatus)

        if (this.state.board.validationStatus === 'success' &&
            this.state.performance.validationStatus === 'success' &&
            this.state.stream.validationStatus === 'success') {
            console.log(this.state.board.validationStatus,
                this.state.performance.validationStatus,
                this.state.stream.validationStatus)
            return false;
        }

        else if (!(this.props.selectedCategory === DIPLOMA ||
            this.props.selectedCategory === SECONDARY_EDUCATION ||
            this.props.selectedCategory === SENIOR_SECONDARY_EDUCATION)) {
            if (this.state.board.validationStatus === 'success' &&
                this.state.degree.validationStatus === 'success' &&
                this.state.performance.validationStatus === 'success' &&
                this.state.stream.validationStatus === 'success') {
                return false;
            }


        }

        return true;


    }
    handelSubmit = (event) => {
        event.preventDefault();
        const eduDetails = {
            board: this.state.board.value,
            degree: this.state.degree.value,
            institution: this.state.institute.value,
            performanceScale: this.state.performanceScale.value,
            performance: this.state.performance.value,
            educationType: this.props.selectedCategory,
            stream: this.state.stream.value,
            yearOfCompletion: this.state.yearOfCompletion.value
        }
        console.log(eduDetails)

        addEducationDetails(eduDetails)
            .then(response => {
                console.log(eduDetails)
                this.props.action()
            })

    }

    isScaleNotSelected = () => {
        const scale = this.state.performanceScale.value;
        if (scale.length > 0 && [CGPA10, CGPA5, PERCENT].includes(scale)) {
            return false;
        }
        return true;
    }


    render() {
        return (
            <div className={classes.modal}>
                <div className={classes.modal_content} ref={this.props.setFormRef}>
                    <div className={classes.modal_heading}>
                        {this.props.selectedCategory} Education Details
                        <hr/>
                    </div>
                    <form onSubmit={this.handelSubmit} className={classes.formBox}>
                        <label className={commonClasses.label + " " + classes.modal_label}>
                            Board:
                            <input type="text" name='board' placeholder='CBSE, ICSE, NIOS etc..' value={this.state.board.value} required onChange={(event) => this.handleChange(event, this.validateBoard)}
                            />
                            <i>{this.state.board.errorMessage}</i>
                        </label>
                        {
                            (
                                this.props.selectedCategory !== DIPLOMA &&
                                this.props.selectedCategory !== SECONDARY_EDUCATION &&
                                this.props.selectedCategory !== SENIOR_SECONDARY_EDUCATION
                            ) &&
                            <label className={commonClasses.label + " " + classes.modal_label}>
                                Degree:
                                <input type="text" name='degree' placeholder='Btech BCA MA etc..' value={this.state.degree.value} onChange={(event) => this.handleChange(event, this.validateDegree)}
                                />
                                <i>{this.state.degree.errorMessage}</i>
                            </label>
                        }
                        <label className={commonClasses.label + " " + classes.modal_label}>
                            Institute:
                                <input type="text" name='institute' placeholder='DPS, DU, IPU etc..' value={this.state.institute.value} onChange={(event) => this.handleChange(event, this.validateInstitute)}
                            />
                            <i>{this.state.institute.errorMessage}</i>
                        </label>

                        <label className={commonClasses.label + " " + classes.modal_label}>
                            Performance Scale:
                            <select value={this.state.performanceScale.value} onChange={this.handleChange} name="performanceScale">
                                <option value="" selected disabled hidden>Choose a scale..</option>
                                <option value={CGPA5}>CGPA out of 5</option>
                                <option value={CGPA10}>CGPA out of 10</option>
                                <option value={PERCENT}>Percentage%</option>
                            </select>
                        </label>

                        <label className={commonClasses.label + " " + classes.modal_label}>
                            Performance:
                            <input type="number" name='performance' placeholder='78, 9, 4 etc..' value={this.state.performance.value}
                                disabled={this.isScaleNotSelected()}
                                onChange={(event) => this.handleChange(event, this.validatePerformance)} />
                            <i>{this.state.performance.errorMessage}</i>
                        </label>

                        <label className={commonClasses.label + " " + classes.modal_label}>
                            Stream:
                            <input type="text" placeholder="PCM, Commerce, Arts etc.." name='stream' value={this.state.stream.value} onChange={(event) => this.handleChange(event, this.validateStream)} />
                            <i>{this.state.stream.errorMessage}</i>
                        </label>
                        <label className={commonClasses.label + " " + classes.modal_label}>
                            Year of Completion:
                            <input type="number" min="1900" max="2099" step="1" name="yearOfCompletion" onChange={(event)=> this.handleChange(event , this.validateYearOfCompletion)}/>
                            <i>{this.state.yearOfCompletion.errorMessage}</i>
                        </label>


                        <button className={classes.cancelbtn} onClick={this.props.action}> Cancel</button>
                        <button type="submit" className={classes.buttonSave}>Save</button>
                    </form>

                </div>
            </div>
        )
    }

    validateBoard = (board) => {
        const boardREGEX = RegExp('^[a-zA-Z]+[ A-Za-z]*$');
        if (!boardREGEX.test(board)) {
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter albhabets only and leading spaces are not allowed',
            }

        }

        return {
            validationStatus: 'success',
        }


    }

    validateDegree = (degree) => {
        const degreeREGEX = RegExp('^[a-zA-Z]+[a-zA-Z ]*$');
        if (!degreeREGEX.test(degree)) {
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
    validateInstitute = (institute) => {
        const instituteREGEX = RegExp('^[a-zA-Z]+[a-zA-Z ]*$');
        if (!instituteREGEX.test(institute)) {
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

    validatePerformance = (performance) => {
        const scaleREGEX = RegExp('^[0-9]*(?!-).?[0-9]{1,2}$');
        if (!scaleREGEX.test(performance)) {
            console.log("Here for regex")
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter in format: 1, 1.5 , 99.87 etc.!',
            }
        }
        performance = parseFloat(performance)
        if (this.state.performanceScale.value === CGPA5 && (performance > 5 || performance < 0)) {
            console.log("here for >5")
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter value between 0-5 only!',

            }

        }

        else if (this.state.performanceScale.value === CGPA10 && (performance > 10 || performance < 0)) {
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter value between 0-10 only!',

            }

        }

        else if (this.state.performanceScale.value === PERCENT && (performance > 100 || performance < 0)) {
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter value between 0-100 only!',

            }

        }
        else {
            console.log("here no error")
            return {
                validationStatus: 'success',
                ErrorMessage: '',
            }

        }

    }
    validateStream = (stream) => {
        const streamREGEX = RegExp('^[a-zA-Z]+[a-zA-Z ]*$');
        if (!streamREGEX.test(stream)) {
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter albhabets only and leading spaces are not allowed',
            }

        }

        return {
            validationStatus: 'success',
        }


    }
    validateYearOfCompletion = (yearOfCompletion)=>{
        const yearOfCompletionREGEX = RegExp('^[0-9]{4}$')
        if(!yearOfCompletionREGEX.test(yearOfCompletion)){
            return {
                validationStatus: 'error',
                errorMessage: 'Please enter 4 digits numeric value only!',
            }

        }

        return {
            validationStatus: 'success',
        }
        
    }






}
export default EducationAdd;