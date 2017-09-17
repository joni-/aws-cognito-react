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
  logout: 'LOGOUT',
  ensureLoggedIn: 'ENSURE_LOGGED_IN',
  ensureLoggedInFail: 'ENSURE_LOGGED_IN_FAIL',
  ensureLoggedInSuccess: 'ENSURE_LOGGED_IN_SUCCESS',
  ensuringLoggedInStatus: 'ENSURING_LOGGED_IN_STATUS',
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

const logout = () => ({
  type: Types.logout
});

const ensureLoggedIn = () => ({
  type: Types.ensureLoggedIn
});

const Actions = {
  register,
  confirm,
  login,
  logout,
  ensureLoggedIn
};

export { Types };

export default Actions;
