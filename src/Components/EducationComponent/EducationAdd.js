import classes from './EducationComponent.css'
import React from 'react';



const EducationAdd = (props) =>{
    return (
        <div className={classes.modal}>
            <div className={classes.modal_content} ref={props.setFormRef}>
                <button onClick={props.action}> Cancel</button>
            </div>
        </div>
    )
}
export default EducationAdd;