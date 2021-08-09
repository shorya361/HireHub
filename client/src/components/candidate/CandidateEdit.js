import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import ChipInput from 'material-ui-chip-input';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux';
import jwt from 'jwt-decode';

export const CandidateEdit = (props) => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user, shallowEqual);

  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [skills, setSkills] = useState(user.skills ? user.skills : []);
  const [contact, setContact] = useState(user.contact);

  const onAddChip = (chip) => {
    setSkills([...skills, chip]);
  };

  const onDeleteChip = (chip, index) => {
    const arrCopy = [...skills];
    arrCopy.splice(index, 1);
    setSkills([...arrCopy]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios
      .post(
        '/candidate/editCandidate',
        {
          name: name,
          location: location,
          contact: contact,
          skills: skills,
        },
        { headers: headers }
      )
      .then((response) => {
        const token = response.data.token;
        const user = jwt(token);
        localStorage.setItem('token', token);
        dispatch(setUser(user));
        props.history.push('/candidate');
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
                    <Form.Group contorlId='skills'>
                      <Form.Label>Skills</Form.Label>
                      <Row className='mx-0'>
                        <ChipInput
                          value={skills}
                          placeholder='Skills'
                          fullWidth={true}
                          onAdd={(chip) => onAddChip(chip, skills, setSkills)}
                          onDelete={(chip, index) =>
                            onDeleteChip(chip, index, skills, setSkills)
                          }
                        />
                      </Row>
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
