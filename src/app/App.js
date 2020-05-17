import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../login/Login'
import Register from '../Register/Register'
import Navigation from '../Navigation/Navigation'
import Book from '../Book/Book'
import MessageDetails from '../MessageDetails/MessageDetails'
import WriteMessage from '../WriteMessage/WriteMessage'
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

        <Navigation resetState={this.resetState} authenticated={this.state.authenticated}/>
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
          <WriteMessage email={this.state.email}/>
          <h1>{`name is ${this.state.name}`}</h1>
          <h1>{`email is ${this.state.email}`}</h1>
          <Book getMessage = {this.getMessage}/>
        </Route>

        <Route path="/message">
          <MessageDetails messageDetails={this.state.messageDetails}/>
        </Route>

      </BrowserRouter>

    )
  }
}


