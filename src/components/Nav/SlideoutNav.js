import React, { useEffect, useCallback } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../store/actions/authActions';

const SlideoutNav = ({ navActive, setNavActive }) => {
  let { pathname } = useLocation();
  let history = useHistory();
  const authState = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  useEffect(() => {
    setNavActive(false);
  }, [pathname, setNavActive]);

  const handleLogout = () => {
    onLogout();
    return history.push('/');
  };

  const renderSlideoutNav = () => {
    return (
      <StyledNav>
        <ul>
          {authState.user ? (
            <>
              <li>
                <NavLink
                  to='/your/listings/new'
                  onClick={() => setNavActive(false)}
                >
                  Create Listing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/your/listings'
                  onClick={() => setNavActive(false)}
                >
                  My Listings
                </NavLink>
              </li>
              <li>
                <NavLink to='/your/orders' onClick={() => setNavActive(false)}>
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/your/purchases'
                  onClick={() => setNavActive(false)}
                >
                  My Purchases
                </NavLink>
              </li>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/login' onClick={() => setNavActive(false)}>
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink to='/signup' onClick={() => setNavActive(false)}>
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </StyledNav>
    );
  };

  return navActive ? renderSlideoutNav() : null;
};

const StyledNav = styled.nav`
  width: 24rem;
  top: 6.4rem;
  height: 100%;
  background: black;
  position: fixed;
  color: #fff;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    cursor: pointer;
    margin-top: 2.4rem;
    margin-left: 1.6rem;
    font-weight: 700;
  }
`;

export default SlideoutNav;
