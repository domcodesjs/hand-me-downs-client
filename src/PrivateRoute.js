import { useEffect, useState, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { signup, logout } from './store/actions/authActions';
import { API_URL } from './config';

const PrivateRoute = (props) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loginSuccess = useCallback((user) => dispatch(signup(user)), [
    dispatch
  ]);
  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        if (localStorage.getItem('jwt')) {
          const JWT = localStorage.getItem('jwt');
          const res = await fetch(`${API_URL}/auth/verifyJWT`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JWT}`
            }
          });

          const data = await res.json();

          loginSuccess(data);
          if (isMounted) {
            setLoading(false);
            return setAuthenticated(true);
          }
        } else {
          if (isMounted) {
            logoutUser();
            setLoading(false);
            return setAuthenticated(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          logoutUser();
          setLoading(false);
          return setAuthenticated(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [loginSuccess, logoutUser]);

  const renderAuthenticated = () => {
    if (loading) {
      return (
        <StyledSpinner>
          <Loader
            type='TailSpin'
            color='#14FFEC'
            height={100}
            width={100}
            className='spinner'
          />
        </StyledSpinner>
      );
    }

    if (authenticated === false) {
      return <Redirect to='/login'></Redirect>;
    }

    return (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      ></Route>
    );
  };

  return renderAuthenticated();
};

const StyledSpinner = styled.main`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;

  .spinner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default PrivateRoute;
