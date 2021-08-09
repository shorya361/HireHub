import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const JobList = ({ jobs }) => {
  return (
    <React.Fragment>
      {jobs &&
        jobs.map((job) => {
          return (
            <Card className='mb-2' border='dark'>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle>
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
                </Card.Subtitle>
                <Card.Text>
                  {job.description.substr(
                    0,
                    Math.min(job.description.length, 200)
                  )}
                  &nbsp;
                  <Link to={`/job/${job._id}`}>...Read more</Link>
                  <br />
                  {job.locations.map((location) => {
                    return <span className='chips'>{location}</span>;
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
    </React.Fragment>
  );
};
