import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { JobCard } from './JobCard';

export const Jobs = ({ jobs }) => {
  return (
    <Container>
      <Row>
        {jobs.map((job) => (
          <Col xs={12} md={4}>
            <JobCard job={job} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
