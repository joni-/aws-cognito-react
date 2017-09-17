import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import Actions from './Auth/Actions';


const Navigation = ({ isAuthenticated, logout }) => (
  <Nav bsStyle="pills" activeKey={1}>
    <NavItem href="/">Home</NavItem>
    {isAuthenticated && <NavItem href="/profile">Profile</NavItem>}
    {!isAuthenticated && <NavItem href="/login">Log in</NavItem>}
    {!isAuthenticated && <NavItem href="/signup">Sign up</NavItem>}
    {isAuthenticated && <NavItem onSelect={logout}>Logout</NavItem>}
  </Nav>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(Actions.logout());
  }
});

const WrappedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);

const Layout = ({ children }) => (
  <div>
    <WrappedNavigation />
    {children}
  </div>
);

export default Layout;
