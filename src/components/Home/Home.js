import React from 'react';
import LatestListings from './LatestListings';

const Home = () => {
  return (
    <>
      <iframe
        width='100%'
        height='400px'
        title='how to use hand me downs'
        src='https://www.youtube.com/embed/OQu32o0MFpQ'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
      <LatestListings></LatestListings>
    </>
  );
};

export default Home;
