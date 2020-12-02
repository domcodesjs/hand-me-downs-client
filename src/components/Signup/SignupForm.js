import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/actions/authActions';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const authState = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleSignup = useCallback(
    (email, username, password) => dispatch(signup(email, username, password)),
    [dispatch]
  );
  let history = useHistory();

  useEffect(() => {
    if (authState.user) {
      return history.push('/');
    }
  }, [authState.user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      email.trim() === '' ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      return;
    }

    return handleSignup(email, username, password);
  };

  return (
    <>
      {authState.error ? (
        <StyledErrors>
          <p>{authState.error}</p>
          {/* {errors.map((error) => (
            <p key={error.param}>{error.msg}</p>
          ))} */}
        </StyledErrors>
      ) : null}
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='email'>Username</label>
        <input
          type='username'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Sign Up</button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;

  label {
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
  }

  label:not(:first-child) {
    margin-top: 1.6rem;
  }

  input {
    height: 4.8rem;
    padding-left: 0.8rem;
    font-size: 1.6rem;
  }

  button {
    margin-top: 1.6rem;
    height: 4.8rem;
    background: #3c3c3c;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 1.4rem;
  }
`;

const StyledErrors = styled.div`
  background: red;
`;

export default SignupForm;
