import React, { Component } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { getMessageOwner } from '../API/getInfo'
import './Message.css'
export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      content: '',
      redirect: false,
      owner: true
    }
  }

  reply = () => {
    const details = {
      messageId: this.props.messageInfo._id,
      name: this.state.name,
      email: this.state.email,
      content: this.state.content,
      replies: this.props.messageInfo.replies
    }
    this.props.getMessage(details)
    this.setState({ redirect: true })
  }

  delete = () => {
    fetch('http://localhost:5000/delete', {
      method: 'delete',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: this.props.messageInfo._id
      })
    })
      .then(res => res.json())
      .then(jsonres => {
        this.props.refresh()
      })
  }

  componentWillMount() {
    getMessageOwner(this.props.messageInfo.owner)
      .then(jsonResp => {
        this.setState({ name: jsonResp.name, email: jsonResp.email, content: this.props.messageInfo.content })
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
            <Row>
              <Col>
                <Button variant="primary" onClick={this.reply}>Reply</Button>
              </Col>
              {this.state.owner && <Col className="editable">
                <Button className="" variant="primary" onClick={this.edit}>Edit</Button>
                <Button className="" variant="primary" onClick={this.delete}>Delete</Button>
              </Col>}
            </Row>
          </Card.Body>
        </Card>
      )
    }
  }
}
