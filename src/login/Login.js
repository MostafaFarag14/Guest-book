import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      authorized: false,
      loading: false
    }
  }

  handleLogin = () => {
    const { getUserInfo } = this.props
    this.setState({loading: true})
    fetch('https://pacific-atoll-58394.herokuapp.com/login',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body:
          JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
      }
    )
      .then(response => {

        if (response.status !== 200) {
          this.setState({loading: false})
          console.log(response)
          var warning = document.getElementById('warning')
          warning.style.display = "block"
          warning.innerText = 'Invalid email or password'
          warning.style.color = 'red'
          throw Error
        }
        return response.json()
      }
      )
      .then(data => {
        this.setState({ authorized: true })
        getUserInfo(data.name, data.email)
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.state.authorized) {
      return <Redirect to='/home' />
    }
    else {

      return (
        <Container style={{ width: "30%" }}>
          <div>
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
            {
              <Button variant="primary" type="button" onClick={this.handleLogin} disabled={this.state.loading}>
                {this.state.loading ? 'Loading...' : 'Sign in'}
              </Button>
            }
          </div >
        </Container >
      )
    }
  }
}
