import React, { Component } from 'react'
import { Col, Card, Button, Container } from 'react-bootstrap'
import { getMessage, getMessageOwner } from '../API/getInfo'
import WriteMessage from '../WriteMessage/WriteMessage';
import './MessageDetails.css'
export default class MessageDetails extends Component {
  constructor() {
    super()
    this.state = {
      messageId: '',
      name: '',
      email: '',
      currentUserEmail: '',
      message: {},
      replies: []
    }
  }

  updateReplies = (reply) => {
      getMessage(reply)
        .then(message => {
          getMessageOwner(message.owner)
            .then((user) => {
              this.setState({ replies: this.state.replies.concat([{ name: user.name, email: user.email, content: message.content }]) })
            })})
  }
  componentWillMount() {
    this.setState({
      messageId: this.props.messageDetails.messageId, currentUserEmail: this.props.email
      , name: this.props.messageDetails.name, email: this.props.messageDetails.email
    }, () =>
      getMessage(this.state.messageId)
        .then(message => {
          this.setState({ message: message })
        })
        .then(() => {
          this.state.message.replies.map(reply => {
            this.updateReplies(reply)
          })
        })
    )

  }

  updateMessage = (message) => {
    this.setState({ message: message}, () => {
      const reply = message.replies[message.replies.length -1]
      this.updateReplies(reply)
    })
  }

  render() {
    return (
      <Container>
        <Col>
          <Card className="message">
            <Card.Body>
              <Card.Title>
                <h4>{this.state.name}</h4>
                <h5>{this.state.email}</h5>
              </Card.Title>
              <Card.Text className="content">
                {this.state.message.content}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {this.state.replies.map(reply => {
          return <Col md={{ span: 8, offset: 3 }}>
            <Card className="reply-message">
              <Card.Body>
                <Card.Title>
                  <h4>{reply.name}</h4>
                  <h5>{reply.email}</h5>
                </Card.Title>
                <Card.Text className="content">
                  {reply.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        })}
        <Col md={{ span: 8, offset: 3 }}>
          <WriteMessage updateMessage={this.updateMessage} messageId={this.state.messageId} reply={true} email={this.state.currentUserEmail} />
        </Col>
      </Container>
    )
  }
}
