import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Illustrations } from '../assets';

export const Home = (props) => {
  return (
    <Container className='my-5'>
      <Row className='justify-content-around my-5'>
        <Col xs={12} md={6} className=''>
          <img
            src={Illustrations.JobOffers}
            alt='log in'
            style={{
              background: 'cover',
              position: 'center',
              width: '85%',
              height: '85%',
            }}
            className='mb-4 align-items-start'
          />
        </Col>
        <Col xs={12} md={4} className=' my-2' style={{ position: 'relative' }}>
          <p
            style={{
              margin: '0px 5px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
            }}
          >
            <h5 className='my-3'>
              Find any kind of jobs, be it technical or non-technical.
            </h5>
          </p>
        </Col>
      </Row>
      <Row className='justify-content-around my-5'>
        <Col xs={12} md={6} className=' order-md-2'>
          <img
            src={Illustrations.FindPeople}
            alt='log in'
            style={{
              background: 'cover',
              position: 'center',
              width: '85%',
              height: '85%',
            }}
            className='mb-4 align-items-start'
          />
        </Col>
        <Col
          xs={12}
          md={4}
          className='order-md-1 my-2'
          style={{ position: 'relative' }}
        >
          <p
            style={{
              margin: '0px 5px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
            }}
          >
            <h5 className='my-3'>
              Post jobs to find out amazing people who fit in your needs.
            </h5>
          </p>
        </Col>
      </Row>
      <Row className='justify-content-around my-5'>
        <Col xs={12} md={6} className=''>
          <img
            src={Illustrations.FindJobs}
            alt='log in'
            style={{
              background: 'cover',
              position: 'center',
              width: '85%',
              height: '85%',
            }}
            className='mb-4 align-items-start'
          />
        </Col>
        <Col xs={12} md={4} className=' my-2' style={{ position: 'relative' }}>
          <p
            style={{
              margin: '0px 5px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
            }}
          >
            <h5>Choose the best jobs which match your profile.</h5>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
