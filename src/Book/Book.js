import React, { Component } from 'react'
import Message from '../Message/Message'
import './Book.css'
export default class Book extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }
  componentWillMount(){
    fetch('http://localhost:5000/book',
    {
      method: 'get',
      headers: 
      {
        "content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(jsonResponse => this.setState({messages: jsonResponse}))
  }
  render() {
      return (
        <div>
          {this.state.messages.map( message => {
          return <Message messageInfo={message} getMessage={this.props.getMessage}/>
          })}
        </div>
      )
  }
}
