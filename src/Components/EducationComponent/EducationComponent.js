import React,{ Component } from 'react';
import {
    SECONDARY_EDUCATION,
    SENIOR_SECONDARY_EDUCATION,
    GRADUATION,
    POST_GRADUATION,
    PHD,
    DIPLOMA,

} from '../Constants/index';
import classes from './EducationComponent.css';
import EducationAdd from './EducationAdd';
import { getEducationDetails } from '../Utils/ApiUtils';
import ShowEducationDetails from './ShowEducationDetails';
class Education extends Component {
    state = {
    }

    getUsersEducationDetails = (username) =>{
        getEducationDetails(username)
        .then(response =>{
            this.setState({
                educationDetails:response,
            })
        })
    }

    componentWillReceiveProps(nextProps){
        this.getUsersEducationDetails(nextProps.username);
    }

    handleCategory = () => {

        if (!this.state.showCategories) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClickCategory, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClickCategory, false);
        }
        this.setState(prevState => ({
            showCategories: !prevState.showCategories,
            eduDetails: [
                SECONDARY_EDUCATION,
                SENIOR_SECONDARY_EDUCATION,
                GRADUATION,
                POST_GRADUATION,
                PHD,
                DIPLOMA
            ],

        }));
    }

    handleOutsideClickCategory = (event) => {
        // ignore clicks on the component itself
        if (this.node.contains(event.target)) {
            return;
        }
        this.handleCategory()
    }

    handleShowAddForm = () => {
        if (!this.state.showEducationAddForm) {
            // attach/remove event handler
            document.addEventListener('click', (this.handleOutsideClickForm), false);
        } else {
            document.removeEventListener('click', this.handleOutsideClickForm, false);
        }
        this.setState(prevState => ({
            showEducationAddForm: !prevState.showEducationAddForm,
        }))
        if(this.props.username)
            this.getUsersEducationDetails(this.props.username)
    }

    handleOutsideClickForm = (event) => {
        // ignore clicks on the component itself
        if (this.addRef.contains(event.target)) {
            return;
        }
        this.handleShowAddForm()
    }

    setCategory = (event) => {
        const selectedCategory = event.target.value
        if (!this.state.showCategories) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClickCategory, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClickCategory, false);
        }
        this.setState(prevState => ({
            showCategories: !prevState.showCategories,
            eduDetails: [
                SECONDARY_EDUCATION,
                SENIOR_SECONDARY_EDUCATION,
                GRADUATION,
                POST_GRADUATION,
                PHD,
                DIPLOMA
            ],
            selectedEduType: selectedCategory,
            showEducationAddForm: true,
        }));

    }

    setFormRef = (addRef) => {
        this.addRef = addRef;
    }

    render() {
        return (
            <div className={classes.education} >
                <div className={classes.eduHeading}>
                    <div className={classes.heading}>
                        <strong>EDUCATION:</strong>
                    </div>
                    <div className={classes.icon} >
                        <i className="fas fa-plus fa-1x" onClick={this.handleCategory}></i>
                    </div>
                </div>
                <hr />
                <ShowEducationDetails eduDetail={this.state.educationDetails}/>
                {this.state.showCategories &&
                    (
                        <div className={classes.modal}  >
                            <div className={classes.modal_content} ref={node => { this.node = node; }}>
                                <div className={classes.close}><span onClick={this.handleCategory}> &times;</span></div>
                                {
                                    this.state.eduDetails.map(
                                        (category, i) => <button className={classes.button} onClick={this.setCategory} id="test" value={i} key={i} >{category}</button>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                {this.state.performScale}
                {
                    this.state.showEducationAddForm &&
                    <EducationAdd action={this.handleShowAddForm} setFormRef={this.setFormRef} selectedCategory={this.state.eduDetails[this.state.selectedEduType]} />
                }

            </div>
        )
    }

}
export default Education;