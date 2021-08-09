import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const JobCard = ({ job }) => {
  return (
    <Card
      style={{
        width: '100%',
        maxHeight: '300px',
        minHeight: '300px',
        marginBottom: '10px',
        overflow: 'auto',
      }}
    >
      <Card.Header as='h5'>{job.title}</Card.Header>
      <Card.Body style={{ position: 'relative' }}>
        <Card.Title>
          {job.skillsRequired.map((skill) => {
            return (
              <React.Fragment>
                <Badge pill variant='dark' style={{ fontWeight: '400' }}>
                  {skill}&nbsp;&nbsp;
                </Badge>
              </React.Fragment>
            );
          })}
        </Card.Title>
        <Card.Text>
          {job.description.substr(0, Math.min(80, job.description.length)) +
            '...'}
        </Card.Text>

        <Link
          className='text-center'
          style={{
            position: 'absolute',
            bottom: '0',
            marginBottom: '5px',
            marginLeft: '35px',
          }}
          to={`/job-stats/${job._id}`}
        >
          View Applicants
        </Link>
      </Card.Body>
    </Card>
  );
};
