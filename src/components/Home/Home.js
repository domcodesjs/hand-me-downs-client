import React from 'react';
import styled from 'styled-components';
import searchIcon from './images/search-icon.png';
import heroImg from './images/hero.png';
import demoImg1 from './images/demo-img-1.png';
import demoImg2 from './images/demo-img-2.png';
import demoImg3 from './images/demo-img-3.png';
import demoImg4 from './images/demo-img-4.png';

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('this does not do anything yet...');
  };

  return (
    <StyledHome>
      <form onClick={handleSubmit}>
        <input type='text' placeholder='search' />
        <button type='submit'>
          <img src={searchIcon} alt='' />
        </button>
      </form>
      <img src={heroImg} alt='Hero' className='hero-img' />
      <div>
        <h1>Newly Added</h1>
        <div className='newly-added-images'>
          <img src={demoImg1} alt='Demo' />
          <img src={demoImg2} alt='Demo' />
          <img src={demoImg3} alt='Demo' />
          <img src={demoImg4} alt='Demo' />
          <img src={demoImg1} alt='Demo' />
          <img src={demoImg2} alt='Demo' />
          <img src={demoImg3} alt='Demo' />
          <img src={demoImg4} alt='Demo' />
          <img src={demoImg3} alt='Demo' />
          <img src={demoImg4} alt='Demo' />
        </div>
      </div>
    </StyledHome>
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
