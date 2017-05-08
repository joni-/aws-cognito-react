import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Actions from './Actions';
import Form from './Form';


class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verification: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.confirm(this.props.user.username, this.state.verification);
  }

  render() {
    if (this.props.confirmationSucceeded) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    const verification = {
      type: 'text',
      label: 'Verification code',
      onChange: (e) => this.setState({verification: e.target.value})
    };

    const elements = [verification];

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
        <h1>Confirm your account</h1>
        <Form
          elements={elements}
          onSubmit={this.onSubmit}
          submitEnabled />
        { this.props.registerInProgress && loadingIndicator }
        { this.props.error && <div>{this.props.error}</div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerInProgress: state.auth.registerInProgress,
  error: state.auth.error,
  user: state.auth.user,
  confirmationSucceeded: state.auth.confirmationSucceeded
});

const mapDispatchToProps = (dispatch) => ({
  confirm: (email, verification) => {
    dispatch(Actions.confirm(email, verification));
  }
});

export { Confirm };

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
