import React ,{Component} from 'react'
import classes from '../EducationComponent/EducationComponent.css'
import commonClasses from '../common/common.css'
class ShowProfileInternshipDetails extends Component{
    render(){
        return(
            <div>
                 {this.props.internDetails &&
                    this.props.internDetails.map((internDetails) => {
                        return (
                            <div key={internDetails.internId}>
                                <div className={classes.eduFlexBody}>
                                    <div className={classes.detailHeading}>
                                        <div className={classes.details}>
                                            <p><strong>{internDetails.profile}</strong></p>
                                            <p>{internDetails.organization}({internDetails.location})</p>
                                            <p>{internDetails.dateStarted} to {internDetails.dateEnd}</p>
                                            <p><strong>Description:</strong>{internDetails.description}</p>
                                        </div>
                                    </div>
                                </div>
                           </div>
                     )
                } )
                 }              
            </div>
        )
    }
}
export default ShowProfileInternshipDetails 