import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Actions from './Auth/Actions';


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ensuringLoggedInStatus: state.auth.ensuringLoggedInStatus
});

const mapDispatchToProps = (dispatch) => ({
  ensureLoggedIn: () => {
    dispatch(Actions.ensureLoggedIn());
  }
});

const RequireAuth = (WrappedComponent) => {
  class AuthComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ensuringLoggedInStatus: false
      };
    }

    componentWillMount() {
      this.props.ensureLoggedIn();
      this.setState(() => ({
        ensuringLoggedInStatus: true
      }));
    }

    componentWillReceiveProps(nextProps) {
      this.setState(() => ({
        ensuringLoggedInStatus: nextProps.ensuringLoggedInStatus
      }));
    }

    render() {
      if (this.state.ensuringLoggedInStatus) {
        return (
          <FontAwesome
            name='spinner'
            size='5x'
            spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
        );
      }

      return this.props.isAuthenticated
        ? <WrappedComponent {...this.props} />
        : <Redirect to={{ pathname: '/login' }} />;
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}


export default RequireAuth;
