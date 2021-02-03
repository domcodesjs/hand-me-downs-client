import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Nav from '../Nav/Nav';

const Header = ({ toggleNav, navActive }) => {
  const navRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  navRef.current = scrolled;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 88;
      if (navRef.current !== show) {
        setScrolled(show);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledHeader navRef={scrolled}>
      <Nav toggleNav={toggleNav} navActive={navActive}></Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 8.8rem;
  padding: 0 4.8rem;
  position: fixed;
  /* z-index: 1000; */
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  // fix box-shadow later
  ${({ navRef }) => (navRef ? { 'box-shadow': '5px 5px 50px #000' } : null)}
`;

export default Header;
