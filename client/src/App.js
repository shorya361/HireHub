import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Home,
  Header,
  Login,
  Register,
  EmployerDashboard,
  EmployerEdit,
  PostJob,
  JobStats,
  Job,
  CandidateDashboard,
  CandidateEdit,
  EmployerRoute,
  CandidateRoute,
  PublicRoute,
  Error404,
  Spinner,
} from './components';
import './App.css';
import { setUser } from './redux';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user));
    }
    setLoading(false);
  });

  return (
    <Router>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <Switch>
          <PublicRoute exact path='/' component={Home} />
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute exact path='/register' component={Register} />
          <EmployerRoute exact path='/employer' component={EmployerDashboard} />
          <EmployerRoute exact path='/employer-edit' component={EmployerEdit} />
          <EmployerRoute exact path='/post-job' component={PostJob} />
          <EmployerRoute exact path='/job-stats/:id' component={JobStats} />
          <CandidateRoute
            exact
            path='/candidate'
            component={CandidateDashboard}
          />
          <CandidateRoute
            exact
            path='/candidate-edit'
            component={CandidateEdit}
          />
          <CandidateRoute exact path='/job/:id' component={Job} />
          <Route component={Error404} />
        </Switch>
      )}
    </Router>
  );
};

export default App;
