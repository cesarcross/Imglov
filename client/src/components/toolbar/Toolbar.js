import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import Logo from './Logo';
import NavItem from './NavItem';
import { isAuthenticated } from '../../utilities/auth-helpers';

const toolbar = () => {
  return (
    <header className="Toolbar">
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {/* <NavItem link="/" exact>Home</NavItem> */}
            <NavItem link="/gallery" exact>Explore</NavItem>
            {(!!isAuthenticated())? (
              <NavItem link="/gallery/new" exact>New Collection</NavItem>
            ) : null}
            {(!!isAuthenticated())? (
              <NavItem link="/logout">Logout</NavItem>
            ) : (
              <NavItem link="/login" exact>Login</NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default toolbar;