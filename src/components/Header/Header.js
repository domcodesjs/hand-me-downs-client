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
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  ${({ navRef }) => (navRef ? { 'box-shadow': '0 .1rem 1rem #999' } : null)}
`;

export default Header;
