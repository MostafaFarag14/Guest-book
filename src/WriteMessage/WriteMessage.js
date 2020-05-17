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
      .then(message => console.log(message))
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
    }
  }

  render() {
    const {reply} = this.props
    console.log(reply)
    return (
      <Container className="messageBox">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
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
