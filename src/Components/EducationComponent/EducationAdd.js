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
class EducationAdd extends Component {

    state = {
        board: {
            value: '',
        },
        degree: {
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
                    <form className={classes.formBox}>
                        <label className={commonClasses.label}>
                            Board:
                            <input type="text" name='board' placeholder='Board' value={this.state.board.value} onChange={(event) => this.handleChange(event, this.validateBoard)}
                                onBlur={this.validateBoard} />
                            <i>{this.state.board.errorMessage}</i>
                        </label>
                        {
                            (
                                this.props.selectedCategory !== DIPLOMA &&
                                this.props.selectedCategory !== SECONDARY_EDUCATION &&
                                this.props.selectedCategory !== SENIOR_SECONDARY_EDUCATION
                            ) &&
                            <label className={commonClasses.label}>
                                Degree:
                                <input type="text" name='degree' placeholder='Degree' value={this.state.degree.value} onChange={(event) => this.handleChange(event, this.validateDegree)}
                                />
                                <i>{this.state.degree.errorMessage}</i>
                            </label>
                        }

                        <label className={commonClasses.label}>
                            Performance Scale:
                            <select value={this.state.performanceScale.value} onChange={this.handleChange} name="performanceScale">
                                <option value="" selected disabled hidden>Choose a scale..</option>
                                <option value={CGPA5}>CGPA out of 5</option>
                                <option value={CGPA10}>CGPA out of 10</option>
                                <option value={PERCENT}>Percentage%</option>
                            </select>
                        </label>

                        <label className={commonClasses.label}>
                            Performance:
                            <input type="number" name='performance' value={this.state.performance.value}
                                disabled={this.isScaleNotSelected()}
                                onChange={(event) => this.handleChange(event, this.validatePerformance)} />
                            <i>{this.state.performance.errorMessage}</i>
                        </label>

                        <label className={commonClasses.label}>
                            Stream:
                            <input type="text" placeholder='Stream' name="stream" value={this.state.stream.value} onChange={(event) => this.handleChange(event, this.validateStream)}
                                onBlur={this.validatePerformance} />
                            <i>{this.state.stream.errorMessage}</i>
                        </label>
                        <label className={commonClasses.label}>
                            Year of Completion:
                            <input type="number" min="1900" max="2099" step="1" name="yearOfCompletion" />
                        </label>


                        <button className={classes.cancelbtn} onClick={this.props.action}> Cancel</button>
                        <button className={classes.buttonSave} onClick={this.props.action}> Save</button>
                    </form>

                </div>
            </div>
        )
    }

    validateBoard = (board) => {
        const boardREGEX = RegExp('(^[a-zA-Z]+[a-zA-Z ]*)$');
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
        if (this.state.performanceScale.value === CGPA5 && (performance> 5 || performance < 0)) {
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
    validatestream = (stream) => {
        const streamREGEX = RegExp('(^[a-zA-Z]+[a-zA-Z ]*)$');
        if (!streamREGEX.test(stream)) {
            return {
                validationStatus: 'error',
                ErrorMessage: 'Please enter albhabets only and leading spaces are not allowed',
            }

        }
        else {
            return {
                validationStatus: 'success',
                ErrorMessage: '',
            }
        }

    }





}
export default EducationAdd;