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
  width: 100%;
  background: #000;
  height: 8.8rem;
`;

export default Header;
