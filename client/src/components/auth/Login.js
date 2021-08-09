import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Illustrations } from '../../assets';
import { setUser } from '../../redux';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/user/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const token = response.data.token;
          const user = jwt(token);
          localStorage.setItem('token', token);
          alert('successfully logged you in');
          dispatch(setUser(user));
          props.history.push(`/${user.type}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className='my-4'>
      <Row>
        <Col xs={12}>
          <h3 className='w-100 text-center my-3'>Sign In!</h3>
        </Col>
        <Col xs={12}>
          <Row className='justify-content-center'>
            <Col xs={12}>
              <Row className='justify-content-center my-2'>
                <img
                  src={Illustrations.LogIn}
                  alt='log in'
                  style={{
                    maxWidth: '80%',
                    height: '25vh',
                    maxHeight: '150px',
                  }}
                  className='mb-4'
                />
              </Row>
            </Col>
            <Col xs={10} md={6}>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email Address'
                    required
                  />
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                  />
                </Form.Group>

                <Form.Row
                  style={{ display: 'flex', WebkitJustifyContent: 'center' }}
                  className='my-2'
                >
                  <Button variant='dark' type='submit'>
                    Sign in&nbsp;<span className='fas fa-sign-in-alt'></span>
                  </Button>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
