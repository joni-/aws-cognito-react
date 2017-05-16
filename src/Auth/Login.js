import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Actions from './Actions';
import Form from './Form';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={{ pathname: '/profile' }} />;
    }

    const email = {
      type: 'text',
      label: 'Email',
      placeholder: 'john.doe@xyz.com',
      onChange: (e) => this.setState({email: e.target.value})
    };

    const password = {
      type: 'password',
      label: 'Password',
      placeholder: 'min. 8 chars',
      onChange: (e) => this.setState({password: e.target.value})
    };

    const elements = [email, password];

    const loadingIndicator = (
      <FontAwesome
        name='spinner'
        size='2x'
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );

    return (
      <div>
        <h1>Log in</h1>
        <Form
          elements={elements}
          onSubmit={this.onSubmit}
          submitEnabled={! this.props.loginInProgress} />
        { this.props.loginInProgress && loadingIndicator }
        { this.props.error && <div>{this.props.error}</div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginInProgress: state.auth.loginInProgress,
  error: state.auth.error,
  isAuthenticated: state.auth.user !== null
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => {
    dispatch(Actions.login(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
