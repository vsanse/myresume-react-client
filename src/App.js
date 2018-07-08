import React, { Component } from 'react';
import './App.css';
import Register from './Components/Users/Register/Register';
import AppHeaderGuest from './Components/common/header/AppHeaderGuest';
import CurrentUser from './Components/Users/CurrentUser/CurrentUser';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout';
import Login from './Components/Users/Login/Login';
import { getCurrentUser } from './Components/Utils/ApiUtils'
class App extends Component {

  state={
    isLoggedIn:false,
    currentUser:null,
    isLoading: false
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

  componentWillMount(){
      this.loadCurrentUser()
    }
  
  render() {
    return (
      <Layout>
        <AppHeaderGuest isLoggedIn={this.state.isLoggedIn}/>
        <Switch>
          <Route 
            path="/register" 
            render={
              (props) => <Register isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
              }/>
          <Route 
            path="/login" 
            render={
              (props) => <Login isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} action={this.loadCurrentUser}/>
              } />
          <Route 
            path="/me"             
            render={
              (props) => <CurrentUser isLoggedIn={this.state.isLoggedIn} {...this.state.currentUser} />
            } />
        </Switch>
      </Layout>

    );
  }
}

export default App;
