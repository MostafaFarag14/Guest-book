import React, { Component } from 'react'
import Login from '../login/Login'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="login-page">
        <Login className="login-form"/>
      </div>
    )
  }
}


