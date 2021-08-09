import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

export const EmployerRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user, shallowEqual);

  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.type === 'employer' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export const CandidateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.type === 'candidate' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={user.type === 'candidate' ? '/candidate' : '/employer'}
          />
        )
      }
    />
  );
};
