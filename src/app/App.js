import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from '../login/Login'
import Register from '../Register/Register'
import Navigation from '../Navigation/Navigation'

import './App.css'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      messageDetails: {}
    }
  }


  render() {
    return (
      <BrowserRouter>

        <Route exact path="/">
          <Navigation resetState={this.resetState} />
          <div className="login-page">
            <Login className="login-form" getUserInfo={this.getUserInfo} authenticate={this.authenticate} />
          </div>
          <div style={{ display: 'none' }} id="warning"></div>
        </Route>

        <Route path="/register">
          <Navigation resetState={this.resetState} />
          <Register getUserInfo={this.getUserInfo} />
        </Route>

        <Route path="/home">
          <Navigation resetState={this.resetState} />
        </Route>

        <Route path="/message">
        <Navigation resetState={this.resetState} />
        </Route>

      </BrowserRouter>

    )
  }
}


