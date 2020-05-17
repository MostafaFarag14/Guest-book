import React, { Component } from 'react'
import { Col, Card, Button, Container } from 'react-bootstrap'
import {getMessage, getMessageOwner} from '../API/getInfo'
import WriteMessage from '../WriteMessage/WriteMessage';
import './MessageDetails.css'
export default class MessageDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      replies: []
    }
  }
  componentWillMount(){
    this.props.messageDetails.replies.map(reply => {
      getMessage(reply)
      .then(message => 
        {
          console.log(message)
          getMessageOwner(message.owner)
          .then((user) => {
            console.log(user)
            this.setState({replies: this.state.replies.concat([{name: user.name, email: user.email, content: message.content}])})
          })
          .then( () =>console.log(this.state.replies))
        }
        )})

  }
  render() {
    const { messageDetails, email } = this.props
    return (
      <Container>
        <Col>
        <Card className="message">
          <Card.Body>
            <Card.Title>
              <h4>{messageDetails.name}</h4>
              <h5>{messageDetails.email}</h5>
              </Card.Title>
            <Card.Text className="content">
              {messageDetails.content}
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
              <Card.Text>
                {reply.content}
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
        })}
        <Col md={{ span: 8, offset: 3 }}>
          <WriteMessage messageId={messageDetails.messageId} reply={true} email={email}/>
        </Col>
      </Container>
    )
  }
}
