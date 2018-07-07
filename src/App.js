import React, { Component } from 'react';
import './App.css';
import Register from './Components/Users/Register/Register'
import AppHeader from './Components/common/header/AppHeader';
import {Route, Switch, withRouter} from 'react-router-dom';
import Layout from './hoc/Layout';
import Login from './Components/Users/Login/Login';
import { ACCESS_TOKEN } from './Components/Constants/index';
import { getCurrentUser } from './Components/Utils/ApiUtils'
class App extends Component {

  state={
    isLoggedIn:false,
    currentUser:null,
  }

  componentWillMount(){
    if(localStorage.getItem(ACCESS_TOKEN)){
     const  user = getCurrentUser()
      .then(response => {
        this.setState({
          currentUser:response
        })
        return(this.state.currentUser)
      })
      .then(user=>
        {if(user){
          this.setState({
            isLoggedIn:true,
          });
        }});
      
      }
    }
  
  render() {
    return (
      <Layout>
        <AppHeader/>
        <Switch>
          <Route 
            path="/register" 
            render={
              (props) => <Register isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
              }/>
          <Route 
            path="/login" 
            render={
              (props) => <Login isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}
              />} />
        </Switch>
      </Layout>

    );
  }
}

export default App;
