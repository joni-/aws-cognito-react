import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Actions from './Actions';
import Form from './Form';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state.email, this.state.password);
  }

  render() {
    if (this.props.askConfirmation) {
      return <Redirect to={{ pathname: '/confirm' }} />
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
        <h1>Sign up</h1>
        <Form
          elements={elements}
          onSubmit={this.onSubmit}
          submitEnabled={! this.props.registerInProgress} />
        { this.props.registerInProgress && loadingIndicator }
        { this.props.error && <div>{this.props.error}</div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerInProgress: state.auth.registerInProgress,
  error: state.auth.error,
  askConfirmation: state.auth.askConfirmation
});

const mapDispatchToProps = (dispatch) => ({
  register: (email, password) => {
    dispatch(Actions.register(email, password));
  }
});

export { Signup };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
