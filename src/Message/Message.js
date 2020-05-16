import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import {getMessageOwner} from '../API/getInfo'
import './Message.css'
export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      content: '',
      redirect: false
    }
  }

  reply = () => {
    const details = {
      name: this.state.name,
      email: this.state.email,
      content: this.state.content,
      replies: this.props.messageInfo.replies
    }
    this.props.getMessage(details)
    this.setState({ redirect: true })
  }

  componentWillMount(){
    getMessageOwner(this.props.messageInfo.owner)
    .then(jsonResp => {
      this.setState({name: jsonResp.name, email: jsonResp.email, content: this.props.messageInfo.content})
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/message" />
    }
    else {
      return (
        <Card className="message">
          <Card.Body>
          <Card.Title>
              <h4>{this.state.name}</h4>
              <h6>{this.state.email}</h6>
              </Card.Title>
            <Card.Text className="content">
              {this.state.content}
            </Card.Text>
            <Button variant="primary" onClick={this.reply}>Reply</Button>
          </Card.Body>
        </Card>
      )
    }
  }
}
