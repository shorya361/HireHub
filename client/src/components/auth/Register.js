import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Illustrations } from '../../assets';
import { setUser } from '../../redux';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

export const Register = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [accountType, setAccountType] = useState('candidate');
  const dispatch = useDispatch();



  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/user/register', {
        name: name,
        email: email,
        password: password,
        type: accountType,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // alert('Succesfully logged in');
          const token = response.data.token;
          console.log(token)
          const user = jwt(token);
          localStorage.setItem('token', token);
          console.log(token)
          dispatch(setUser(user));
          props.history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setAccount = (e) => {
    setAccountType(e.target.id);
  };

  return (
    <Container className='my-5'>
      <Row>
        <Col xs={12} className='d-xs-block d-md-none'>
          <Row>
            <h3 className='w-100 text-center'>Sign up!</h3>
          </Row>
        </Col>
        <Col xs={12} md={5} style={{ maxHeight: '400px' }}>
          <img
            src={Illustrations.SignUp}
            alt='log in'
            style={{
              background: 'cover',
              position: 'center',
              width: '100%',
              height: '100%',
            }}
            className='mb-4 align-items-start'
          />
        </Col>
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12} className='d-none d-md-block'>
              <Row>
                <h3 className='w-100 text-center'>Sign up!</h3>
              </Row>
            </Col>
          </Row>
          <Form onSubmit={onSubmit}>
            <Row className='justify-content-center my-2'>
              <Col>
                <Form.Group controlId='name'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Full Name'
                  />
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email Address'
                  />
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Account Type</Form.Label>
                  <Row className='justify-content-around'>
                    <Col xs={6} md={4}>
                      <img
                        src={Illustrations.Candidate}
                        style={{
                          maxWidht: '40vw',
                          maxHeight: '50vw',
                          height: '200px',
                          width: '180px',
                        }}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <img
                        src={Illustrations.Employer}
                        style={{
                          maxWidht: '40vw',
                          maxHeight: '50vw',
                          height: '200px',
                          width: '180px',
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className='justify-content-around'>
                    <Col xs={6} md={4}>
                      <Form.Check
                        type='radio'
                        label='Candidate'
                        name='accountType'
                        id='candidate'
                        onChange={setAccount}
                        checked={accountType === 'candidate' ? 1 : 0}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <Form.Check
                        type='radio'
                        label='Employer'
                        name='accountType'
                        id='employer'
                        onChange={setAccount}
                        checked={accountType === 'employer' ? 1 : 0}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                {/* <Form.Group controlId='picture'>
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type='file'
                    onChange={(e) => setPicture(e.target.files[0])}
                  />
                </Form.Group> */}

                <Row
                  style={{
                    display: 'flex',
                    WebkitJustifyContent: 'space-around',
                  }}
                  className='my-2'
                >
                  <Button variant='dark' type='submit'>
                    Sign up!&nbsp;<span className='fas fa-user-plus'></span>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
