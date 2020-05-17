import React, { Component } from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import './writeMessage.css'
export default class WriteMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: ''
    }
  }
  handleMessage = (reply) => {
    if(reply){
      fetch('http://localhost:5000/reply',
      {
        method: 'post',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          email: this.props.email,
          content: this.state.message,
          messageId: this.props.messageId
        })
      })
      .then(res => res.json())
      .then(message => this.props.updateMessage(message))
      .then(this.setState({message: ''}))
    }

    else{
      fetch('http://localhost:5000/message',
      {
        method: 'post',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          email: this.props.email,
          content: this.state.message
        })
      })
      .then( () => {
        this.props.refresh()
        
      }
      )
    }
  }

  render() {
    const {reply} = this.props
    return (
      <Container className="messageBox">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="3" value={this.state.message} onChange={ (e) =>
             {this.setState({message: e.target.value})}}/>
        </Form.Group>
        <Button onClick={() => this.handleMessage(reply)}>
          Write Message
        </Button>
      </Container>
    )
  }
}
