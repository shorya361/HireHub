import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export const JobDetails = ({ job }) => {
  return (
    <Card border='dark' style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title className='text-center'>Job Details</Card.Title>
        <Card.Text>
          <h4>{job.title}</h4>
          {job.description}
          <br />
          <br />
          <h4>Skills Required</h4>
          {job.skillsRequired.map((skill) => {
            return <span className='chips'>{skill}</span>;
          })}
          <br />
          <br />
          <h5>Locations</h5>
          {job.locations.map((location) => {
            return (
              <h5 style={{ display: 'inline-block' }}>
                <Badge pill variant='secondary' style={{ fontWeight: '300' }}>
                  {location}
                </Badge>{' '}
                &nbsp;&nbsp;
              </h5>
            );
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
