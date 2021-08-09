import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Profile } from './Profile.js';
import { JobList } from './JobList';
import { useSelector, shallowEqual } from 'react-redux';
import { Spinner } from '../Spinner';
import axios from 'axios';

export const CandidateDashboard = (props) => {
  const user = useSelector((state) => state.user, shallowEqual);
  const [loading, setLoading] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Call the API here to get the jobs
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios
      .get('/candidate/getAllJobs', { headers: headers })
      .then((response) => {
        setJobs(response.data.jobs);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className='my-3'>
      <Row className='justify-content-center my-3'>
        <Col xs={12} md={3}>
          <Profile user={user} />
        </Col>
        <Col xs={12} md={9}>
          {loading ? <Spinner /> : <JobList jobs={jobs} />}{' '}
        </Col>
      </Row>
    </Container>
  );
};
