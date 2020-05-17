import React, { Component } from 'react'
import Message from '../Message/Message'
import WriteMessage from '../WriteMessage/WriteMessage'
export default class Book extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      refresh: false
    }
  }
  
  refresh = () => {
    console.log('refresh', this.state.refresh)
    fetch('http://localhost:5000/book',
    {
      method: 'get',
      headers: 
      {
        "content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(jsonResponse => this.setState({messages: jsonResponse, refresh: ! this.state.refresh}))
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
    .then(jsonResponse => this.setState({messages: jsonResponse, refresh: false}))
  }
  render() {
      return (
        <div>
          <WriteMessage refresh={this.refresh} reply={false} email={this.props.email}/>
          {this.state.messages.map( message => {
          return <Message refresh={this.refresh} messageInfo={message} getMessage={this.props.getMessage}/>        })}
        </div>
      )
  }
}
