import { Route, Redirect } from 'react-router';
import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      window.localStorage.getItem('token') ?
        (<Component {...props} />) :
        (<Redirect to="/login" />)
    )}
  />
);

export default PrivateRoute;
