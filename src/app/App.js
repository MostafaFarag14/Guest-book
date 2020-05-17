import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../login/Login'
import Register from '../Register/Register'
import Navigation from '../Navigation/Navigation'
import Book from '../Book/Book'
import MessageDetails from '../MessageDetails/MessageDetails'

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
    this.setState({ name: name, email: email, authenticated: true })
  }
  getMessage = (message) => {
    this.setState({messageDetails: message})
  }

  render() {
    return (
      <BrowserRouter>

        <Navigation resetState={this.resetState} authenticated={this.state.authenticated}
         name={this.state.name} email={this.state.email}/>
        <Route exact path="/">
          <div className="login-page">
            <Login className="login-form" getUserInfo={this.getUserInfo} />
            <div style={{ display: 'none', textAlign: 'center' }} id="warning"></div>
          </div>
        </Route>

        <Route path="/register">
          <Register getUserInfo={this.getUserInfo} />
          <div style={{ display: 'none', textAlign: 'center' }} id="warning"></div>
        </Route>

        <Route path="/home">
          
          <Book email={this.state.email} getMessage = {this.getMessage}/>
        </Route>

        <Route path="/message">
          <MessageDetails email={this.state.email} messageDetails={this.state.messageDetails}/>
        </Route>

      </BrowserRouter>

    )
  }
}


