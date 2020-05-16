import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './Navigation.css'
export default function Navigation({ resetState }) {

  if (window.location.href.endsWith('home'))
    return (
      <Col className='Navigation'>
        <Link to="/">
          <Button variant="light" onClick={ () => resetState()} >Sign Out</Button>
        </Link>
      </Col>
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
