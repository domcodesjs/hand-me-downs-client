import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    box-sizing: inherit;
    font-size: 62.5%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
  }

  h1, h2, h3 {
    font-family: 'Spartan', sans-serif;
    margin: 0;
  }

  p {
    margin: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    outline: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
