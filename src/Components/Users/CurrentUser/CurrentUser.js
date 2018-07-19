import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import classes from './CurrentUser.css';
import Layout from '../../../hoc/Layout';
import EducationComponent from '../../EducationComponent/EducationComponent'
import SkillsComponent from '../../SkillsComponent/SkillsComponent';
import InternshipComponent from '../../InternshipComponent/InternshipComponent'
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
                username:nextProps.userName,
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
            this.props.history.push("/")
        }
    }
    
    render(){
        return (
            <Layout>
                <div className={classes.userinfo}>
                    <div className={classes.name}><strong>{this.props.firstName}<span> {this.props.lastName}</span></strong></div>
                    <div className={classes.work}>{this.props.designation} at <span> {this.props.currentOrganization}</span></div>
                    <div className={classes.icon}>

                        <a href={this.props.linkedinLink} className={classes.linkedin}><i className="fab fa-linkedin "></i></a>
                        <a href={this.props.githubLink} className={classes.github}><i className="fab fa-github "></i></a><br/>

                        <a href={"mailto:"+this.props.email} className={classes.email}><i className="fas fa-envelope fa-1x"></i><span>{this.props.email}</span></a>
                    </div>
                </div>
                <EducationComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username}/>
                <SkillsComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username}/>
                <InternshipComponent isLoggedIn={this.props.isLoggedIn} username={this.state.username}/>

            </Layout>
        ) 
    }
}

export default withRouter(CurrentUser);