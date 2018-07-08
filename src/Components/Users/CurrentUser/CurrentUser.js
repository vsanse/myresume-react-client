import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import classes from './CurrentUser.css'
class CurrentUser extends Component{
    
    state={
        isLoggedIn:false,
        userName:{
            value:'',
            
        },
        firstName:{
            value:''
        },
        lastName:{
            value:''
        },
        phoneNumber:{
            value:''
        },
        currentOrganization:{
            value:''
        },
        designation:{
            value:''
        },
        githubLink:{
            value:''
        },
        linkedinLink:{
            value:''
        },
        email:{
            value:''
        },

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isLoggedIn !== this.props.isLoggedIn && nextProps.isLoggedIn===true){
            this.setState({
                isLoggedIn:nextProps.isLoggedIn,
                username:{
                    value: nextProps.userName,
                },
                firstName:{
                    value: nextProps.firstName,
                },
                lastName:{
                    value: nextProps.lastName,
                },
                designation:{
                    value: nextProps.designation
                },
                currentOrganization:{
                    value:nextProps.currentOrganization,
                },
                linkedinLink:{
                    value:nextProps.linkedinLink,
                },
                githubLink:{
                    value:nextProps.githubLink,
                },
                email:{
                    value:nextProps.email,
                }

            });
        }
        else{
            this.props.history.push("/login")
        }
    }
    
    render(){
        return (
            <div className={classes.userinfo}>
                <div><strong>{this.props.firstName}<span> {this.props.lastName}</span></strong></div>
                <div>{this.props.designation} at <span> {this.props.currentOrganization}</span></div>
                <div className={classes.icon}>
                    <a href={this.props.linkedinLink} className={classes.linkedin}><i className="fab fa-linkedin fa-2x"></i></a>
                    <a href={this.props.linkedinLink} className={classes.github}><i className="fab fa-github fa-2x"></i></a><br/>
                    <a href={"mailto:"+this.props.email} className={classes.email}><i className="fas fa-envelope fa-1x"></i><span>{this.props.email}</span></a>
                </div>
            </div>
        ) 
    }
}

export default withRouter(CurrentUser);