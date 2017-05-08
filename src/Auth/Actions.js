const Types = {
  register: 'REGISTER',
  registrationSuccess: 'REGISTRATION_SUCCESS',
  registrationFail: 'REGISTRATION_FAIL',
  confirm: 'CONFIRM',
  confirmationSuccess: 'CONFIRMATION_SUCCESS',
  confirmationFail: 'CONFIRMATION_FAIL',
  login: 'LOGIN',
  loginSuccess: 'LOGIN_SUCCESS',
  loginFail: 'LOGIN_FAIL',
};

const register = (email, password) => ({
  type: Types.register,
  email,
  password
});

const confirm = (email, verification) => ({
  type: Types.confirm,
  email,
  verification
})

const login = (email, password) => ({
  type: Types.login,
  email,
  password
});

const Actions = {
  register,
  confirm,
  login
};

export { Types };

export default Actions;
