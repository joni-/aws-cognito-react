import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

const Navigation = ({ isAuthenticated }) => (
  <Nav bsStyle="pills" activeKey={1}>
    <NavItem href="/">Home</NavItem>
    {isAuthenticated && <NavItem href="/profile">Profile</NavItem>}
    {!isAuthenticated && <NavItem href="/login">Log in</NavItem>}
    {!isAuthenticated && <NavItem href="/signup">Sign up</NavItem>}
    {isAuthenticated && <NavItem href="/logout">Logout</NavItem>}
  </Nav>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.user !== null
});

const WrappedNavigation = connect(mapStateToProps)(Navigation);

const Layout = ({ children }) => (
  <div>
    <WrappedNavigation />
    {children}
  </div>
);

export default Layout;
