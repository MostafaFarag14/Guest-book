import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../login/Login'
import Register from '../Register/Register'
import Navigation from '../Navigation/Navigation'

import './App.css'

const initialState = {
  name: '',
  email: '',
  authenticated: false,
  messageDetails: {}
}

export default class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  resetState = () => {
    this.setState(initialState)
  }

  getUserInfo = (name, email) => {
    this.setState({ name: name, email: email })
  }

  render() {
    return (
      <BrowserRouter>

        <Route exact path="/">
          <Navigation resetState={this.resetState} />
          <div className="login-page">
            <Login className="login-form" getUserInfo={this.getUserInfo} />
            <div style={{ display: 'none', textAlign: 'center' }} id="warning"></div>
          </div>
        </Route>

        <Route path="/register">
          <Navigation resetState={this.resetState} />
          <Register getUserInfo={this.getUserInfo} />
          <div style={{ display: 'none', textAlign: 'center' }} id="warning"></div>
        </Route>

        <Route path="/home">
          <Navigation resetState={this.resetState} />
          <h1>{`name is ${this.state.name}`}</h1>
          <h1>{`email is ${this.state.email}`}</h1>
        </Route>

        <Route path="/message">
          <Navigation resetState={this.resetState} />
        </Route>

      </BrowserRouter>

    )
  }
}


