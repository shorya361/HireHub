import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { removeUser } from '../../redux';

export const Header = (props) => {
  const user = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Link
        to={
          user ? (user.type === 'employer' ? '/employer' : '/candidate') : '/'
        }
        className='navbar-brand'
      >
        &nbsp;<span className='fab fa-hire-a-helper'></span>
        &nbsp;HireHub{' '}
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {user ? (
            <Fragment>
              <span
                style={{ color: 'white', alignSelf: 'center' }}
                className='mx-2'
              >
                Welcome, {user.name}!
              </span>
              <span
                style={{
                  color: 'white',
                  cursor: 'pointer',
                  alignSelf: 'center',
                }}
                className='mx-2'
                onClick={() => dispatch(removeUser())}
              >
                Logout?
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <Link to='/login' className='nav-link'>
                Sign in&nbsp;<span className='fas fa-sign-in-alt'></span>
              </Link>
              <Link to='/register' className='nav-link'>
                Sign up&nbsp;<span className='fas fa-user-plus'></span>
              </Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
