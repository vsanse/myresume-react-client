import React, { Component } from 'react';
// import classes from './App.css';
import Register from './Components/Users/Register/Register';
import AppHeaderGuest from './Components/common/header/AppHeaderGuest';
import CurrentUser from './Components/Users/CurrentUser/CurrentUser';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout';
import Login from './Components/Users/Login/Login';
import { getCurrentUser } from './Components/Utils/ApiUtils'
import { ACCESS_TOKEN } from './Components/Constants';
import Profile from './Components/Profile/Profile'
import Search from './Components/Users/Search/Search';

class App extends Component {

  state = {
    isLoggedIn: false,
    currentUser: null,
    isLoading: false,
    

  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isLoggedIn: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentWillMount() {
    this.loadCurrentUser()
  }

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    this.setState({
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    });
  }
  render() {
    return (
      <Layout>
        <AppHeaderGuest isLoggedIn={this.state.isLoggedIn} logout={this.handleLogout} />
        <Switch>
          {
            !this.state.isLoggedIn &&
            <Route
              exact
              path="/"
              component={Search}
            />
          } 
          <Route
            exact
            path="/register"
            render={
              (props) => <Register isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} />
            } />
          <Route
            exact
            path="/login"
            render={
              (props) => <Login isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} action={this.loadCurrentUser} />
            } />
          <Route
            exact
            path="/me"
            render={
              (props) => <CurrentUser isLoggedIn={this.state.isLoggedIn} {...this.state.currentUser} />
            } />
          <Route
            exact
            path="/profile/:username"
            render={
              (props) => <Profile {...props}/>
            } />
        </Switch>
      </Layout>

    );
  }
}

export default withRouter(App);
