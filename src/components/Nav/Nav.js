import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import menuIcon from './images/menu.svg';
import xIcon from './images/x.svg';
import cartIcon from './images/shopping-cart.svg';

const Nav = ({ toggleNav, navActive }) => {
  let history = useHistory();

  return (
    <StyledNav>
      {navActive ? (
        <img src={xIcon} alt='Menu Icon' onClick={toggleNav} />
      ) : (
        <img src={menuIcon} alt='Menu Icon' onClick={toggleNav} />
      )}

      <Link to='/'>
        <h1>hand me downs</h1>
      </Link>
      <img
        src={cartIcon}
        alt='Cart Icon'
        onClick={() => history.push('/cart')}
      />
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 28.8rem;
  justify-content: space-between;

  @media (min-width: 576px) {
    width: 50rem;
  }
  @media (min-width: 768px) {
    width: 70rem;
  }
  @media (min-width: 992px) {
    width: 90rem;
  }

  @media (min-width: 1200px) {
    width: 112rem;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  img {
    cursor: pointer;
  }
`;

export default Nav;
