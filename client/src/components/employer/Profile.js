import React from 'react';
import { Container, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Illustrations } from '../../assets';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

export const Profile = ({ user }) => {
  return (
    <Container className='mb-2 px-0'>
      <Card border='dark' style={{ width: '100%' }}>
        <OverlayTrigger
          key={'top'}
          placement={'right'}
          overlay={<Tooltip id={`tooltip-top`}>Edit Profile</Tooltip>}
        >
          <Link to='/employer-edit'>
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
              <br />
              {user.contact}
            </small>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Container>
  );
};
