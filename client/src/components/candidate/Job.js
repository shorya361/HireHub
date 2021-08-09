import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Spinner } from '../Spinner';
import { JobDetails } from '../JobDetails';
import axios from 'axios';

export const Job = (props) => {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({});

  useEffect(() => {
    let jobId = props.location.pathname;
    jobId = jobId.substr(5, jobId.length);

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios
      .get(`/candidate/showJob/${jobId}`, { headers: headers })
      .then((response) => {
        setJob(response.data.job);
        setLoading(false);
      })
      .catch((err) => alert(err));
  }, []);

  const apply = () => {
    let jobId = props.location.pathname;
    jobId = jobId.substr(5, jobId.lenght);
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios
      .post('/candidate/applyJob', { jobId: jobId }, { headers: headers })
      .then((response) => {
        props.history.push('/candidate');
        alert('Applied for the job!');
      })
      .catch((err) => alert(err));
  };

  return (
    <Container className='my-3 justify-content-center'>
      {loading ? (
        <Spinner />
      ) : (
        <Row className='justify-content-center'>
          <Col xs={12} md={6}>
            <JobDetails job={job} />
            <Row
              style={{
                display: 'flex',
                WebkitJustifyContent: 'center',
              }}
              className='my-2'
            >
              <Button variant='dark' type='submit' onClick={apply}>
                Apply
              </Button>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};
