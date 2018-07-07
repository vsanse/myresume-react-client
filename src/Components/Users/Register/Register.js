import React, { Component } from 'react';
import { register, checkUserNameAvailability, checkEmailAvailability } from '../../Utils/ApiUtils'
import classes from './Register.css';
import { Link, withRouter} from 'react-router-dom';
import  {
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
                    value:inputValue.trim(),
                }
            });
        }
        else if(inputName === 'currentOrganization' || inputName === 'password' || inputName === 'designation'){
            this.setState({
                [inputName]:{
                    value:inputValue,
                    ...validation(inputValue)
                }
            });
        }
        else{
            this.setState({
                [inputName]:{
                    value:inputValue.trim(),
                    ...validation(inputValue.trim())
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
            this.props.history.push("/login")
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Username: 
                    <input 
                        name="userName" 
                        type="text" 
                        value={this.state.userName.value} 
                        placeholder="john"
                        onBlur={this.validateUserNameAvailability}
                        onChange={(event) => this.handleChange(event, this.validateUserName)}
                        />
                        <i>{this.state.userName.errorMessage}</i>
                    </label>

                <label>
                    First Name: 
                    <input 
                        name="firstName" 
                        type="text" 
                        placeholder="John"
                        value={this.state.firstName.value} 
                        onChange={this.handleChange.bind(this)}
                        />
                    <i>{this.state.firstName.errorMessage}</i>
                </label>

                <label>
                    Last Name: 
                    <input 
                        name="lastName" 
                        type="text" 
                        placeholder="Miller"
                        value={this.state.lastName.value} 
                        onChange={this.handleChange.bind(this)}
                        /> 
                         <i>{this.state.lastName.errorMessage}</i>
                    </label>

                <label>
                    Email:
                    <input 
                        name="email" 
                        type="text" 
                        value={this.state.email.value} 
                        placeholder="johnMiller@myresume.com"
                        onChange={(event) => this.handleChange(event, this.validateEmail)}
                        onBlur={this.checkEmailAvailable}
                        />
                        <i>{this.state.email.errorMessage}</i>
                    </label>

                <label>
                    Phone No: 
                    <input 
                        name="phoneNumber" 
                        type="tel" 
                        pattern="^\d{10}$" 
                        required
                        placeholder="1234567890"
                        title="Please enter a number phone number with 10 digits"
                        value={this.state.phoneNumber.value} 
                        // onChange={(event) => this.handleChange(event, this.validateUserName)}
                        onChange={this.handleChange.bind(this)}
                        />
                    <i>{this.state.phoneNumber.errorMessage}</i>
                    </label>

                <label>
                    Password: 
                    <input 
                        name="password" 
                        type="password" 
                        value={this.state.password.value} 
                        onChange={(event) => this.handleChange(event, this.validatePassword)}
                        />
                        <i>{this.state.password.errorMessage}</i>

                    </label>
                
                <label>
                    Current Organization:
                    <input 
                        name="currentOrganization" 
                        type="text" 
                        value={this.state.currentOrganization.value} 
                        placeholder="Google Inc."
                        onChange={this.handleChange.bind(this)}
                        />
                         <i>{this.state.currentOrganization.errorMessage}</i>
                    </label>
                
                <label>
                    Designation: 
                    <input 
                        name="designation" 
                        type="text" 
                        value={this.state.designation.value} 
                        placeholder="Full Stack Developer"
                        onChange={this.handleChange.bind(this)}
                        />
                        <i>{this.state.designation.errorMessage}</i>
                    </label>
                
                <label>
                    Linkedin Link:
                    <input 
                        name="linkedinLink" 
                        type="url" 
                        value={this.state.linkedinLink.value} 
                        placeholder="https://linkedin.com/us/john"
                        onChange={this.handleChange.bind(this)}
                        />
                         <i>{this.state.linkedinLink.errorMessage}</i>
                    </label>
                

                <label>
                    Github Link: 
                    <input 
                        name="githubLink" 
                        type="url" 
                        value={this.state.githubLink.value} 
                        placeholder="https://github.com/john-miller"
                        onChange={this.handleChange.bind(this)}
                        />
                        <i>{this.state.githubLink.errorMessage}</i>
                    </label>
                    <label>
                    <button type="submit" className={classes.signupbtn}>Sign Up</button>
                    Already registed? <Link to="/login">Login now!</Link>
                    </label>
                </form>
            </div>
        )
    }

    //validations
    validateUserName = (userName) => {
        // const userName = this.event.target.value;
        const userREGEX = RegExp('^[a-zA-Z]+[0-9]{0,1}$');
        if(!userREGEX.test(userName)){
            return {
                validateStatus: 'error',
                errorMessage: `Username must contain atleast only alphabet and atmost one number at end.`
            }
        }
        else if(userName.length < USERNAME_MIN_LENGTH){
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
        const userValidation = this.validateUserName(userName)
        if(userValidation.validateStatus === 'error')
            return;
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
    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMessage: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMessage: 'Email not valid'
            }
        }
        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    checkEmailAvailable = () => {
        const email = this.state.email.value;
        const emailValidation = this.validateEmail(email);
        if(emailValidation.validateStatus === 'error'){
            this.setState({
                email:{
                    value:email,
                    ...emailValidation
                }
            });
            return;
        }
        this.setState({
            email:{
                value:email,
                validateStatus:'validating',
                errorMessage: null
            }
        });
        checkEmailAvailability(email)
        .then(response =>{
            if(response){
                this.setState({
                    email:{
                        value:email,
                        validateStatus:'error',
                        errorMessage:  'This Email is already registered'
                    }
                });
            }
            else{
                this.setState({
                    email:{
                        value:email,
                        validateStatus:'success',
                        errorMessage:  null
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: email,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH){
            return {
                validateStatus:'error',
                errorMessage: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        }
        else if(password.length > PASSWORD_MAX_LENGTH){
            return {
                validateStatus:'error',
                errorMessage: `Password is too long (Minimum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        }
        else{
            return{
                validateStatus:'success',
                errorMessage:null
            }
        }
    }

}

export default Register;