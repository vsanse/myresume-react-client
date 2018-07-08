import React, { Component } from 'react';
import {login} from '../../Utils/ApiUtils';
import classes from './Login.css';
import { Link, withRouter} from 'react-router-dom';
import { ACCESS_TOKEN } from '../../Constants/index'
class Login extends Component{

    state={
        userName:{
            value:'',
        },
        password:{
            value:'',
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isLoggedIn){
            this.props.history.push('/me')
        }
    }
    handleChange = (event) => {
        // console.log(event.target,validation) 
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]:{
                value:inputValue.trim(),
            }
        })

    }
    handleLogin = (event) =>{
        event.preventDefault();
        const loginRequest = {
            username: this.state.userName.value,
            password: this.state.password.value
        }
        login(loginRequest)
        .then(response =>{
            
            localStorage.setItem(ACCESS_TOKEN, response.token);
            this.props.history.push('/me')
        });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <label>
                        Username:
                        <input 
                        name="userName" 
                        type="text" 
                        placeholder="john"
                        value={this.state.userName.value} 
                        onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                        name="password" 
                        type="password" 
                        value={this.state.password.value} 
                        onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <button type="submit" className={classes.signinbtn}>Sign In</button>
                        Don't have an account? <Link to="/register">Register now!</Link>
                    </label>
                </form>
            </div>
        )
    }

}

export default withRouter(Login);