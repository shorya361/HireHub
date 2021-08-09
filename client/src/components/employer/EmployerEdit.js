import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import axios from 'axios';
import jwt from 'jwt-decode';
import { setUser } from '../../redux';

export const EmployerEdit = (props) => {
  let user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [contact, setContact] = useState(user.mobileNo);

  const onSubmit = (e) => {
    e.preventDefault();
    // send the new user object to the backend and after that update in the redux store
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    axios
      .post(
        '/employer/editEmployer',
        {
          name: name,
          location: location,
          contact: contact,
        },
        { headers: headers }
      )
      .then((response) => {
        const token = response.data.token;
        const user = jwt(token);
        localStorage.setItem('token', token);
        dispatch(setUser(user));
        props.history.push('/employer');
        alert('Successfully updated your profile');
      })
      .catch((err) => alert(err));
  };

  return (
    <Container className='my-3 justify-content-center'>
      <Row className='justify-content-center'>
        <Col xs={12} md={6}>
          <Card border='dark' style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title className='text-center'>Edit Profile</Card.Title>
              <Card.Text>
                <Row>
                  <Form style={{ width: '100%' }} onSubmit={onSubmit}>
                    <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={name}
                        placeholder='Enter name'
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={user.email}
                      />
                    </Form.Group>
                    <Form.Group controlId='location'>
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type='text'
                        value={location}
                        placeholder='Enter location'
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='contactNo'>
                      <Form.Label>Contact No</Form.Label>
                      <Form.Control
                        type='tel'
                        value={contact}
                        placeholder='Enter Contact No'
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Row
                      style={{
                        display: 'flex',
                        WebkitJustifyContent: 'center',
                      }}
                      className='my-2'
                    >
                      <Button variant='dark' type='submit'>
                        Update!
                      </Button>
                    </Form.Row>
                  </Form>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
