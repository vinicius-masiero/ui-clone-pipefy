import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font-family: 'Roboto', serif;
    font-size: 14px;
    background: #ecf1f8;
    color: #333;
    -webkit-font-smoothing: antialiased;
  }
  ul {
    list-style: none;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
