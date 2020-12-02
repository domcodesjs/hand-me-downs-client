import React from 'react';
import styled from 'styled-components';
import Nav from '../Nav/Nav';

const Header = ({ toggleNav, navActive }) => {
  return (
    <StyledHeader>
      <Nav toggleNav={toggleNav} navActive={navActive}></Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  margin: 0 auto;
  background: #000;
  height: 6.4rem;
  color: #fff;
`;

export default Header;
