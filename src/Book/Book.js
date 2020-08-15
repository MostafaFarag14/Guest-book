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
    fetch('https://pacific-atoll-58394.herokuapp.com/book',
    {
      method: 'get',
      headers: 
      {
        "content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(jsonResponse => this.setState({messages: jsonResponse, refresh: ! this.state.refresh}))
    .then( () => window.scrollTo(0,document.body.scrollHeight))
  }
  
  componentWillMount(){
    fetch('https://pacific-atoll-58394.herokuapp.com/book',
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
          return <Message email={this.props.email}  refresh={this.refresh} messageInfo={message} getMessage={this.props.getMessage}/>        })}
        </div>
      )
  }
}
