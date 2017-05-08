import { combineReducers } from 'redux';

import { Types } from './Actions';

const initialState = {
  registerInProgress: false,
  loginInProgress: false,
  askConfirmation: false,
  error: null,
  user: null,
  confirmationSucceeded: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.register:
      return { ...state, registerInProgress: true, askConfirmation: false };
    case Types.registrationSuccess:
      return { ...state, registerInProgress: false, error: null, askConfirmation: true, user: action.user };
    case Types.registrationFail:
      return { ...state, registerInProgress: false, error: action.error, askConfirmation: false }
    case Types.confirm:
      return { ...state, registerInProgress: true };
    case Types.confirmationSuccess:
      return { ...state, registerInProgress: false, error: null, confirmationSucceeded: true };
    case Types.confirmationFail:
      return { ...state, registerInProgress: false, error: action.error, confirmationSucceeded: false };
    case Types.login:
      return { ...state, loginInProgress: true };
    case Types.loginSuccess:
      return { ...state, loginInProgress: false, user: action.user, error: null };
    case Types.loginFail:
      return { ...state, loginInProgress: false, error: action.error };
    default:
      return state;
  }
}

const reducers = combineReducers({
  auth: AuthReducer
});

export default reducers;
