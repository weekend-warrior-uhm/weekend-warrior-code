'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, PencilSquare } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = currentUser ? 'bg-dark' : 'bg-light';

  return (
    <Navbar expand="lg" style={menuStyle} className={`sticky-navbar ${navbarClassName}`}>
      <Container>
        <Navbar.Brand href="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}>Weekend Warrior</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link id="add-activities-nav" href="/activities" key="activities" active={pathName === '/activities'}>
              Activities
            </Nav.Link>
            <Nav.Link id="list-activities-nav" href="/users" key="users" active={pathName === '/users'}>
              Users
            </Nav.Link>
            <Nav.Link
              id="list-activities-nav"
              href="/my-activities"
              key="my-activities"
              active={pathName === '/my-activities'}
            >
              My Activities
            </Nav.Link>
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav className="justify-content-end">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-edit-info" href="/auth/edituserinfo">
                  <PencilSquare />
                  {' '}
                  Edit Info
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  {' '}
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  {' '}
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
