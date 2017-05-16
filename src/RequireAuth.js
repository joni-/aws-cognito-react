import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.user !== null
});

const RequireAuth = (WrappedComponent) => {
  class AuthComponent extends React.Component {
    render() {
      return this.props.isAuthenticated
        ? <WrappedComponent {...this.props} />
        : <Redirect to={{ pathname: '/login' }} />;
    }
  };

  return connect(mapStateToProps)(AuthComponent);
}


export default RequireAuth;
