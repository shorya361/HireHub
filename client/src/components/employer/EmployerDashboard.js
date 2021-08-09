import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Profile } from './Profile.js';
import { Jobs } from './Jobs';
import { useSelector, shallowEqual } from 'react-redux';
import { Spinner } from '../Spinner';
import axios from 'axios';

export const EmployerDashboard = (props) => {
  const user = useSelector((state) => state.user, shallowEqual);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    // Call the API here to get the jobs & mark the loadingJobs = false

    const headers = {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    };

    axios
      .get('/employer/getAllJobs', { headers: headers })
      .then((response) => {
        // setJobs(response.data);
        console.log(response);
        setJobs(response.data.jobs);
        setLoadingJobs(false);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <Container className='my-3'>
      <Row className='justify-content-center my-3'>
        <Col xs={12} md={3}>
          <Profile user={user} />
        </Col>
        <Col xs={12} md={9}>
          <h5 className='text-center'>
            Jobs posted by you: {jobs.length}&nbsp;&nbsp;
            <Button variant='outline-dark'>
              <Link style={{ all: 'unset', color: 'inherit' }} to='/post-job'>
                Post a new job?
              </Link>
            </Button>
          </h5>
          {loadingJobs ? <Spinner /> : <Jobs jobs={jobs} />}
        </Col>
      </Row>
    </Container>
  );
};
