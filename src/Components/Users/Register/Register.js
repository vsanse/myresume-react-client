import React, { Component } from 'react';
import { register, checkUserNameAvailability } from '../../Utils/ApiUtils'
import classes from './Register.css';
import  {
    NAME_MAX_LENGTH, 
    NAME_MIN_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from '../../Constants/index'
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
        if(!validation){
            this.setState({
                [inputName]:{
                    value:inputValue,
                }
            });
        }
        else{
            this.setState({
                [inputName]:{
                    value:inputValue,
                    ...validation(inputValue)
                }
            });
        }
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
                        onBlur={this.validateUserNameAvailability}
                        onChange={(event) => this.handleChange(event, this.validateUserName)}
                        />
                    </label>

                <label>
                    First Name: <strong>{this.state.firstName.errorMessage}</strong>
                    <input 
                        name="firstName" 
                        type="text" 
                        value={this.state.firstName.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>

                <label>
                    Last Name: <strong>{this.state.lastName.errorMessage}</strong>
                    <input 
                        name="lastName" 
                        type="text" 
                        value={this.state.lastName.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>

                <label>
                    Email: <strong>{this.state.email.errorMessage}</strong>
                    <input 
                        name="email" 
                        type="text" 
                        value={this.state.email.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>

                <label>
                    Phone No: <strong>{this.state.phoneNumber.errorMessage}</strong>
                    <input 
                        name="phoneNumber" 
                        type="tel" 
                        value={this.state.phoneNumber.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>

                <label>
                    Password:
                    <input 
                        name="password" 
                        type="password" 
                        value={this.state.password.value} 
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>
                
                <label>
                    Current Organization: <strong>{this.state.currentOrganization.errorMessage}</strong>
                    <input 
                        name="currentOrganization" 
                        type="text" 
                        value={this.state.currentOrganization.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>
                
                <label>
                    Designation: <strong>{this.state.designation.errorMessage}</strong>
                    <input 
                        name="designation" 
                        type="text" 
                        value={this.state.designation.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>
                
                <label>
                    Linkedin Link: <strong>{this.state.linkedinLink.errorMessage}</strong>
                    <input 
                        name="linkedinLink" 
                        type="url" 
                        value={this.state.linkedinLink.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    </label>
                

                <label>
                    Github Link: <strong>{this.state.githubLink.errorMessage}</strong>
                    <input 
                        name="githubLink" 
                        type="url" 
                        value={this.state.githubLink.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
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
        if(userName.length < USERNAME_MIN_LENGTH){
            return {
                validateStatus: 'error',
                errorMessage: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        }else if (userName.length > USERNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMessage: "Username is too long (Maximum "+USERNAME_MAX_LENGTH+" characters allowed.)"
            }
        }else{
            return{
                validateStatus:null,
                errorMessage:null,
            }
        }
    }
    validateUserNameAvailability=() => {
        const userName = this.state.userName.value;
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
        }).catch(_erorr => {
            this.setState({
                userName:{
                value:userName,
                validateStatus: 'success',
                errorMessage: null
                }
            });
        });
        
    }
}

export default Register;