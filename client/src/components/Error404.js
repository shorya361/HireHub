import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { Illustrations } from '../assets';

export const Error404 = (props) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} className='my-5'>
          <Alert variant='dark' className='text-center'>
            Sorry, there is no such page.
          </Alert>
          <img
            src={Illustrations.Error}
            alt='error'
            style={{
              background: 'cover',
              position: 'center',
              width: '100%',
              height: '100%',
            }}
            className='mb-4 align-items-start'
          />
        </Col>
      </Row>
    </Container>
  );
};
