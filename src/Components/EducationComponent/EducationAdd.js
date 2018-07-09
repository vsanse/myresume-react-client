import classes from './EducationComponent.css'
import React from 'react';



const EducationAdd = (props) =>{
    return (
        <div className={classes.modal}>
            <div className={classes.modal_content} ref={props.setFormRef}>

            </div>
        </div>
    )
}
export default EducationAdd;