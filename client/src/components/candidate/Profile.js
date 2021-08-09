import React from 'react';
import { Container, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Illustrations } from '../../assets';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

export const Profile = (props) => {
  const user = useSelector((state) => state.user, shallowEqual);

  return (
    <Container className='mb-2 px-0'>
      <Card border='dark' style={{ width: '100%' }}>
        <OverlayTrigger
          key={'top'}
          placement={'right'}
          overlay={<Tooltip id={`tooltip-top`}>Edit Profile</Tooltip>}
        >
          <Link to='/candidate-edit'>
            <FontAwesomeIcon
              icon={faUserEdit}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                pointer: 'cursor',
              }}
            />
          </Link>
        </OverlayTrigger>
        <Card.Img
          variant='top'
          src={user.profileImage ? user.profileImage : Illustrations.MaleAvatar}
          className='my-2'
          style={{ width: '95%', alignSelf: 'center' }}
        />
        <Card.Body>
          <Card.Title className='text-center'>{user.name}</Card.Title>
          <Card.Subtitle className='text-center lead'>
            <small>
              {user.location}
              <br />
              {user.email}
            </small>
          </Card.Subtitle>
          <Card.Text style={{ alignSelf: 'center' }}>
            {user.skills
              ? user.skills.map((skill) => {
                  return <span className='chips'>{skill}</span>;
                })
              : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
