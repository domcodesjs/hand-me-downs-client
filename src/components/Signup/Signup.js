import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupForm from './SignupForm';

const Signup = () => {
  let history = useHistory();
  const authState = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (authState.user) {
      return history.push('/');
    }
  }, [authState.user, history]);

  return (
    <StyledMain>
      <h1>Sign Up</h1>
      <SignupForm></SignupForm>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  h1 {
    border-bottom: 0.1rem solid #d8d6d5;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    margin: 1.6rem 0;
  }

  @media (min-width: 576px) {
    h1 {
      margin: 1.6rem auto 1.6rem auto;
    }

    form {
      margin: 0 auto;
    }
  }
`;

export default Signup;
