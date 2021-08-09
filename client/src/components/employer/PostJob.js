import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Illustrations } from '../../assets';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';

export const PostJob = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    axios
      .post(
        '/employer/postjob',
        {
          title: title,
          description: description,
          skillsRequired: skills,
          locations: locations,
        },
        { headers: headers }
      )
      .then((response) => {
        console.log('---------------')
        console.log(response)
        props.history.push('/employer');
      })
      .catch((err) => alert(err));
  };

  const onAddChip = (chip, arr, setArr) => {
    setArr([...arr, chip]);
  };

  const onDeleteChip = (chip, index, arr, setArr) => {
    const arrCopy = [...arr];
    arrCopy.splice(index, 1);
    setArr([...arrCopy]);
  };

  return (
    <Container className='my-5'>
      <Row>
        <Col xs={12} className='d-xs-block d-md-none'>
          <Row>
            <h3 className='w-100 text-center'>Post a new Job!</h3>
          </Row>
        </Col>
        <Col xs={12} md={5}>
          <img
            src={Illustrations.JobPost}
            alt='job post'
            style={{
              background: 'cover',
              position: 'center',
              width: '100%',
              height: '100%',
            }}
            className='mb-4'
          />
        </Col>
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12} className='d-none d-md-block'>
              <Row>
                <h3 className='w-100 text-center'>Post a new Job!</h3>
              </Row>
            </Col>
          </Row>

          <Form onSubmit={onSubmit}>
            <Form.Group controlId='email'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title of Job'
                required
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Job description'
                required
              />
            </Form.Group>

            <Form.Group controlId='skills'>
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

            <Form.Group controlId='locations'>
              <Form.Label>Locations</Form.Label>
              <Row className='mx-0'>
                <ChipInput
                  value={locations}
                  placeholder='Locations'
                  fullWidth={true}
                  onAdd={(chip) => onAddChip(chip, locations, setLocations)}
                  onDelete={(chip, index) =>
                    onDeleteChip(chip, index, locations, setLocations)
                  }
                />
              </Row>
            </Form.Group>

            <Form.Row
              style={{ display: 'flex', WebkitJustifyContent: 'center' }}
              className='my-2'
            >
              <Button variant='dark' type='submit'>
                Post!
              </Button>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
