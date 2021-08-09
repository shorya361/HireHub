import React from 'react';
import { Illustrations } from '../assets';
import { Row, Col } from 'react-bootstrap';

export const Spinner = () => {
  return (
    <Row
      className='align-items-center m-0'
      style={{ width: '100%', height: '80vh' }}
    >
      <Col className='justify-content-center'>
        <img
          style={{ display: 'block', margin: 'auto' }}
          src={Illustrations.Loading}
        ></img>
      </Col>
    </Row>
  );
};
