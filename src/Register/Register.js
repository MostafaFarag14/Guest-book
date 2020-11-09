import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import './Register.css'
export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      accepted: false,
      loading: false
    }

  }

  handleRegister = () => {
    const { getUserInfo } = this.props
    if (this.state.name.length && this.state.email.includes('@') && this.state.password.length) {
      this.setState({ loading: true })
      fetch('https://pacific-atoll-58394.herokuapp.com/register',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body:
            JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              password: this.state.password
            })

        }
      )
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log(data)
            getUserInfo(data.name, data.email)
            this.setState({ accepted: true })
          }
          else if (data === 'email already exists') {
            var warning = document.getElementById('warning')
            warning.style.display = "block"
            warning.innerText = 'email already exists'
            warning.style.color = 'red'
          }
        })
        .catch(err => {
          this.setState({ accepted: false })
        })

    }
  }

  render() {
    if (this.state.accepted) {
      return <Redirect to='/home' />
    }
    return (
      <Container style={{ width: "30%" }}>
        <div>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={this.state.name} onChange={(e) => {
              this.setState({ name: e.target.value })
            }} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(e) => {
              this.setState({ email: e.target.value })
            }} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(e) => {
              this.setState({ password: e.target.value })
            }} />
          </Form.Group>


          <Button variant="primary" type="submit" onClick={this.handleRegister} disabled={this.state.loading}>
            {this.state.loading ? 'Loading...': 'Register'} 
            </Button>

        </div>
      </Container>
    )
  }
}
