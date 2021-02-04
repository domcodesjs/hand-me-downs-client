import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SearchForm from '../SearchForm/SearchForm';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton';
import { logout } from '../../store/actions/authActions';

const Nav = ({ toggleNav, navActive }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector(({ auth }) => auth);
  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);

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
      <ul className='nav-contents-right'>
        {authState.user ? (
          <li onClick={logoutUser}>Signout</li>
        ) : (
          <>
            <li>
              <SignupButton></SignupButton>
            </li>
            <li>
              <LoginButton></LoginButton>
            </li>
          </>
        )}
        <li>
          <Link to='/cart'>Cart</Link>
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

  .nav-contents-left {
    display: flex;
    align-items: center;

    img {
      width: 6rem;
      height: 6rem;
    }
  }

  .nav-contents-right {
    display: flex;
    align-items: center;
  }

  form {
    display: flex;

    input {
      border: none;
      outline: none;
      height: 4rem;
      color: #cecece;
      padding-left: 0.8rem;
      background: black;
      width: 28rem;

      ::placeholder {
        color: #ced4da;
      }
    }

    button {
      border: none;
      outline: none;
      height: 4rem;
    }
  }

  @media (min-width: 576px) {
    /* width: 50rem; */
  }
  @media (min-width: 768px) {
    /* width: 70rem; */
  }
  @media (min-width: 992px) {
    /* width: 90rem; */
  }

  @media (min-width: 1200px) {
    /* width: 112rem; */
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
