import React from 'react';
import styled from 'styled-components';
import SearchForm from '../SearchForm/SearchForm';

const Home = () => {
  return (
    <>
      <SearchForm></SearchForm>
      <StyledHome>
        <div>
          <h1>Newly Added</h1>
        </div>
      </StyledHome>
    </>
  );
};

const StyledHome = styled.main`
  form {
    margin-top: 1.6rem;
    display: flex;

    input {
      padding-left: 0.8rem;
      height: 4.8rem;
      box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.19);
      border: none;
      border-radius: 0.4rem;
      width: 100%;
      margin-right: 0.8rem;
    }

    button {
      width: 4.8rem;
      border-radius: 0.4rem;
      box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.19);
      background: #fff;
    }
  }

  .hero-img {
    margin-top: 1.6rem;
  }

  .newly-added-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.6rem;
  }

  h1 {
    margin-top: 4.8rem;
    margin-bottom: 2.4rem;
    text-align: center;
    font-weight: 600;
  }
`;

export default Home;
