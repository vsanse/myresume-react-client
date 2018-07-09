import classes from './EducationComponent.css'
import React from 'react';
import commonClasses from '../common/common.css';


const EducationAdd = (props) =>{
    return (
        <div className={classes.modal}>
            <div className={classes.modal_content} ref={props.setFormRef}>
                <form>
                    <label>
                        Year of Completion:
                        <input type="number" min="1900" max="2099" step="1" />
                        
                    </label>
                    <button className={classes.button} onClick={props.action}> Cancel</button>
                    <button className={classes.button} onClick={props.action}> Save</button>
                </form>
                
            </div>
        </div>
    )
}
export default EducationAdd;