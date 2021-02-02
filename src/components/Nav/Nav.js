import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchForm from '../SearchForm/SearchForm';
import menuIcon from './images/menu.svg';
import xIcon from './images/x.svg';
import cartIcon from './images/shopping-cart.svg';

const Nav = ({ toggleNav, navActive }) => {
  let history = useHistory();

  return (
    <StyledNav>
      <div className='nav-contents-left'>
        <Link to='/'>
          <img
            src='https://leanfrontiers.com/wp-content/uploads/2018/12/logo-placeholder-png.png'
            alt='Placeholder'
            className='logo'
          />
        </Link>
        <Link to='/listings'>Listings</Link>
      </div>
      <SearchForm></SearchForm>
      <ul className='nav-contents-left'>
        <li>
          <Link>Cart</Link>
        </li>
        <li>
          <Link>Sign In</Link>
        </li>
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  justify-content: space-between;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 28.8rem;
  color: #fff;

  .nav-contents-left {
    display: flex;
    align-items: center;

    img {
      width: 6rem;
      height: 6rem;
    }
  }

  form {
    display: flex;

    input {
      border: none;
      outline: none;
      height: 4rem;
    }

    button {
      border: none;
      outline: none;
      height: 4rem;
    }
  }

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
