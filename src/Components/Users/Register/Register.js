import React, { Component } from 'react';
import { register, checkUserNameAvailability } from '../../Utils/ApiUtils'
import classes from './Register.css';
class Register extends Component{
    state={
        userName:{
            value:'',
            
        },
        password:{
            value:''
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

    handleChange = (event, validation) => {
        // console.log(event.target,validation) 
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]:{
                value:inputValue,
                ...validation(inputValue)
            }
        });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        // {
        //     "currentOrganization": "string",
        //     "designation": "string",
        //     "email": "string",
        //     "firstName": "string",
        //     "githubLink": "string",
        //     "lastName": "string",
        //     "linkedinLink": "string",
        //     "password": "string",
        //     "phoneNumber": "string",
        //     "userName": "string"
        //   }
        const registerRequest = {
            userName: this.state.userName.value,
            password: this.state.password.value,
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            phoneNumber: this.state.phoneNumber.value,
            currentOrganization: this.state.currentOrganization.value,
            designation: this.state.designation.value,
            githubLink: this.state.githubLink.value,
            linkedinLink: this.state.linkedinLink.value,
        }
        console.log(registerRequest)
        register(registerRequest)
        .then(response => {
            console.log(response)
        })
    }

    render(){
        return (
            <div className={classes.container}>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Username: <strong>{this.state.userName.errorMessage}</strong>
                    <input 
                        name="userName" 
                        type="text" 
                        value={this.state.userName.value} 
                        onChange={(event) => this.handleChange(event, this.validateUserName)}
                        />
                    </label>
                <label>
                    Password:
                    <input 
                        name="password" 
                        type="password" 
                        value={this.state.password.value} 
                        // onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <div className="clearfix">
                        <button type="button" className={classes.cancelbtn}>Cancel</button>
                        <button type="submit" className={classes.signupbtn}>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }

    //validations
    validateUserName = (userName) => {
        // const userName = this.event.target.value;
        checkUserNameAvailability(userName)
        .then(response => {
            if(!response){
                this.setState({
                    userName:{
                    value:userName,
                    validateStatus: 'error',
                    errorMessage: 'Username already taken! Try another.'
                    }
                })
            }
            else{
                this.setState({
                userName:{
                value:userName,
                validateStatus: 'success',
                errorMessage: null
                }
            });
        }
        });
        
    }
}

export default Register;