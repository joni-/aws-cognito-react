import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

const Navigation = () => (
  <Nav bsStyle="pills" activeKey={1}>
    <NavItem href="/">Home</NavItem>
    <NavItem href="/profile">Profile</NavItem>
    <NavItem href="/login">Log in</NavItem>
    <NavItem href="/signup">Sign up</NavItem>
  </Nav>
);

const Layout = ({ children }) => (
  <div>
    <Navigation />
    {children}
  </div>
);

export default Layout;
