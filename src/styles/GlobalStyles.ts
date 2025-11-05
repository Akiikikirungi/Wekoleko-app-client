// ./styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${props => props.theme.transitions.duration} ${props => props.theme.transitions.ease};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.ease};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .spin-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Mobile-first media query baseline */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    body { font-size: 16px; } /* Base font for accessibility */
  }
`;

export default GlobalStyles;