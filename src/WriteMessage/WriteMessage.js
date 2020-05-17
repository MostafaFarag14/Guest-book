import React, { Component } from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import './writeMessage.css'
export default class WriteMessage extends Component {
  constructor(){
    super()
    this.state = {
      message: ''
    }
  }
  handleMessage = () => {
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

  render() {
    return (
      <Container className="messageBox">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows="3" value={this.state.message} onChange={ (e) =>
             {this.setState({message: e.target.value})}}/>
        </Form.Group>
        <Button onClick={this.handleMessage}>
          Write Message
        </Button>
      </Container>
    )
  }
}
