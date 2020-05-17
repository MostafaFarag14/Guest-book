import React, { Component } from 'react'
import Message from '../Message/Message'
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
    .then(jsonResponse => this.setState({messages: jsonResponse, refresh: false}))
    this.setState({refresh: true})
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
          {this.state.messages.map( message => {
          return <Message refresh={this.refresh} messageInfo={message} getMessage={this.props.getMessage}/>        })}
        </div>
      )
  }
}
