import React, { Component } from 'react';
import { login } from '../../Utils/ApiUtils';
import classes from '../../common/common.css';
import { Link, withRouter } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../Constants/index'
class Login extends Component {

    state = {
        userName: {
            value: '',
        },
        password: {
            value: '',
        },
        validate: {
            status: '',
            message: ''
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn) {
            this.props.history.push('/me')
        }
    }
    handleChange = (event) => {
        // console.log(event.target,validation) 
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: {
                value: inputValue.trim(),
            }
        })

    }
    handleLogin = (event) => {
        event.preventDefault();
        const loginRequest = {
            username: this.state.userName.value,
            password: this.state.password.value
        }
        login(loginRequest)
            .then(response => {
                // console.log(response)
                localStorage.setItem(ACCESS_TOKEN, response.token);
                this.props.action()
                this.props.history.push('/me')
            }).catch(error => {
                if (error.status === 401) {
                    this.setState({
                        validate: {
                            status: 'error',
                            message: 'Invalid Username or Password!',
                        }
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <label className={classes.label}>
                        Username:
                        <input
                            name="userName"
                            type="text"
                            placeholder="john"
                            required
                            value={this.state.userName.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label className={classes.label}>
                        Password:
                        <input
                            name="password"
                            type="password"
                            required
                            value={this.state.password.value}
                            onChange={this.handleChange}
                        />
                        <i>{this.state.validate.message}</i>
                    </label>
                    <label className={classes.label}>
                        <button type="submit" className={classes.btn} >Sign In</button>
                        Don't have an account? <Link to="/register">Register now!</Link>
                    </label>
                </form>
            </div>
        )
    }

}

export default withRouter(Login);