import React, { Component } from 'react'
import { Button, Col, Row, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './Navigation.css'
export default function Navigation({ resetState, authenticated, name, email }) {

  if (authenticated)
    return (
      <Row style={{ marginRight: "0px" }}>
        <Col md="4" className="userInfo">
          <Card className="userCard">
            <Card.Title>
              <h4>{name}</h4>
              <h5>{email}</h5>
            </Card.Title>
          </Card>
        </Col>
        <Col className='Navigation'>
          <Link to="/">
            <Button variant="light" onClick={() => resetState()} >Sign Out</Button>
          </Link>
        </Col>
      </Row>
    )
  else {
    return (
      <Col className='Navigation'>
        <Link className="sign" to="/">
          <Button variant="light">Login</Button>
        </Link>
        <Link className="sign" to="/Register">
          <Button variant="light">Register</Button>
        </Link>
      </Col>
    )
  }

}
