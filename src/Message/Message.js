import React, { Component } from 'react'
import { Card, Button, Col, Row, Form } from 'react-bootstrap'
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
      owner: false,
      editMode: false
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
    fetch('https://pacific-atoll-58394.herokuapp.com/delete', {
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

  edit = (e) => {
    if (e.target.innerText === 'Save') {
      this.setState({ editMode: false }, () => {
        fetch('https://pacific-atoll-58394.herokuapp.com/editmessage', {
          method: 'post',
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: this.props.messageInfo._id,
            content: this.state.content
          })
        })
          .then(res => res.json())
          .then(() => {
            this.props.refresh()
          })
      })
      e.target.innerText = 'Edit'
    }
    else {
      e.target.innerText = 'Save'
      this.setState({ editMode: true })
    }
  }
  componentWillMount() {
    getMessageOwner(this.props.messageInfo.owner)
      .then(jsonResp => {
        this.setState({ name: jsonResp.name, email: jsonResp.email,
           content: this.props.messageInfo.content, owner:  jsonResp.email === this.props.email})
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
            {
              !this.state.editMode && <Card.Text className="content">
                {this.state.content}
              </Card.Text>
            }
            {
              this.state.editMode &&
              <Form.Control as="textarea" rows="2" value={this.state.content} className="content"
                onChange={(e) => this.setState({ content: e.target.value })} />
            }
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
