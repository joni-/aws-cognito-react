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



const CognitoService = {
  register,
  confirm,
  login
};

export default CognitoService;