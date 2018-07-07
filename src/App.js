import React, { Component } from 'react';
import './App.css';
import Register from './Components/Users/Register/Register'
import AppHeader from './Components/common/header/AppHeader';

class App extends Component {
  render() {
    return (<div>
      <AppHeader/>
      <Register/></div>
    );
  }
}

export default App;
