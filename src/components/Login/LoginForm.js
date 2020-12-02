import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { signIn } from '../../store/actions/authActions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authState = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleSignIn = useCallback(
    (email, password) => dispatch(signIn(email, password)),
    [dispatch]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return;
    }
    return handleSignIn(email, password);
  };

  return (
    <>
      {authState.error ? <p>{authState.error}</p> : null}
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Log In</button>
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

export default LoginForm;
