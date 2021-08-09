import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Spinner } from '../Spinner';
import { CandidatesList } from './CandidatesList';

export const JobStats = (props) => {
  const [job, setJob] = useState({});

  useEffect(() => {
    // Fetch the job and the candidates who applied at that job
    let jobId = props.location.pathname;
    jobId = jobId.substr(11, jobId.length);
    // fetch the job details of job with _id = jobId;

    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };
      axios
        .post('/employer/getJob', { jobId: jobId }, { headers: headers })
        .then((response) => {
          setJob(response.data.job);
        })
        .catch((err) => alert(err));
    }
  }, []);

  return (
    <Container className='my-3'>
      {job.id ? (
        <Row className='justify-content-center my-3'>
          <Col xs={12} md={3}>
            <Card
              style={{
                width: '100%',
              }}
            >
              <Card.Header as='h5'>{job.title}</Card.Header>
              <Card.Body style={{ position: 'relative' }}>
                <Card.Title>
                  {job.skillsRequired.map((skill) => {
                    return (
                      <React.Fragment>
                        <Badge
                          pill
                          variant='dark'
                          style={{ fontWeight: '400' }}
                        >
                          {skill}
                        </Badge>
                        &nbsp;&nbsp;
                      </React.Fragment>
                    );
                  })}
                </Card.Title>
                <Card.Text>{job.description}</Card.Text>
                Locations:&nbsp;
                {job.locations.map((location) => {
                  return (
                    <React.Fragment>
                      <Badge pill variant='dark' style={{ fontWeight: '400' }}>
                        {location}
                      </Badge>
                      &nbsp;&nbsp;
                    </React.Fragment>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={9}>
            <CandidatesList candidates={job.candidates} />
          </Col>
        </Row>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};
