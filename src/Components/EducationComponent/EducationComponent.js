import React from 'react';
import { Component} from 'react'
import {
    SECONDARY_EDUCATION, 
    SENIOR_SECONDARY_EDUCATION,
    GRADUATION,
    POST_GRADUATION,
    PHD,
    DIPLOMA
         } from '../Constants/index';
import classes  from './EducationComponent.css';
class Education extends Component {
    state = {
        // showCategories:false,
        showEducationAddForm:false,

    }
    handleCategory = () =>{
        if (!this.state.showCategories) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
          } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
          }
        this.setState(prevState => ({
            showCategories: !prevState.showCategories,
            eduDetails:[
                SECONDARY_EDUCATION, 
                SENIOR_SECONDARY_EDUCATION,
                GRADUATION,
                POST_GRADUATION,
                PHD,
                DIPLOMA
            ],
         }));
    }
    handleOutsideClick = (event) => {
        // ignore clicks on the component itself
        if (this.node.contains(event.target)) {
          return;
        }
        
        this.handleCategory();
      }
    setCategory = (event) =>{
        const selectedCategory = event.target.value
        if (!this.state.showCategories) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
          } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
          }
        this.setState(prevState => ({
            showCategories: !prevState.showCategories,
            eduDetails:[
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
         console.log(this.state.eduDetails[selectedCategory])
    }
    render(){
        return(
            <div className = {classes.education} >
                <div className = {classes.eduHeading}>
                    <div className={classes.heading}>
                        <strong>EDUCATION:</strong> 
                        </div>
                    <div className={classes.icon} >
                        <i className = "fas fa-plus fa-1x" onClick={this.handleCategory}></i>
                        </div>
                </div>
                <hr/>
                { this.state.showCategories &&
                    (
                        <div className = {classes.modal}  >
                            <div className={classes.modal_content}ref={node => { this.node = node; }}>
                            <div className={classes.close}><span onClick={this.handleCategory}> &times;</span></div>
                                {
                                    this.state.eduDetails.map(
                                    (category,i) => <button className={classes.button} onClick={this.setCategory} value={i} key={i} >{category}</button>
                                    )
                                }
                            </div>
                        </div>
                    )
                }   

            </div>
        )
    }

}
export default Education;