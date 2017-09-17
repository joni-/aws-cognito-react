import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

import Config from '../Config/config';


const userPool = new CognitoUserPool({
  UserPoolId: Config.UserPoolId,
  ClientId: Config.ClientId
});

const register = ({ email, password }) => {
  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email
  });

  return new Promise((success, error) => {
    const callback = (err, result) => {
      if (err) {
        error(err);
        return;
      }
      success(result);
    };

    userPool.signUp(email, password, [emailAttribute], null, callback);
  });
};

const confirm = ({ email, verification }) => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  return new Promise((success, error) => {
    const callback = (err, result) => {
      if (err) {
        error(err);
        return;
      }
      success(result);
    };

    user.confirmRegistration(verification, true, callback);
  });
};

const login = ({ email, password }) => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  return new Promise((success, error) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('successfully authenticated', result);
        success(result);
      },

      onFailure: (err) => {
        console.log('error authenticating', err);
        error(err);
      }
    });
  });
};

const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

const logout = () => {
  return new Promise((success) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.signOut();
    }
    success();
  });
};

const isAuthenticated = () => {
  return new Promise((success, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (! cognitoUser) {
      reject('Could not retrieve current user');
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject('Error retrieving user session: ', err);
        return;
      }

      if (session.isValid()) {
        success();
      } else {
        reject('Session is not valid');
      }
    });
  });
};

const CognitoService = {
  register,
  confirm,
  login,
  getCurrentUser,
  logout,
  isAuthenticated
};

export default CognitoService;
