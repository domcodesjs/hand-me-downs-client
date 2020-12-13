import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signIn } from '../../store/actions/authActions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const loginSuccess = useCallback(
    (email, password) => dispatch(signIn(email, password)),
    [dispatch]
  );
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    try {
      setErrors(null);
      const res = await fetch(
        'https://handmedowns-server.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();

      if (!data.success) {
        const errors = data.errors.map((err) => err.msg);
        return setErrors(errors);
      }

      localStorage.setItem('jwt', data.token);
      loginSuccess(data.user);
      return history.push('/');
    } catch (err) {
      return setErrors(['Something went wrong. Please try again.']);
    }
  };

  return (
    <>
      {errors ? (
        <StyledErrors>
          {errors.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </StyledErrors>
      ) : null}
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

const StyledErrors = styled.div`
  p {
    background: #e31c3d;
    color: #fff;
    border-radius: 0.4rem;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }

  p:last-child {
    margin-bottom: 1.6rem;
  }
`;

export default LoginForm;
