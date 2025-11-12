import { createGlobalStyle, keyframes } from "styled-components";

const bgMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

  :root {
    --bg1: #0a0d13;
    --bg2: #101622;
    --accent: #6366f1;
    --accent2: #22c55e;
    --danger: #ef4444;
    --text: #e9edf5;
    --muted: #8b97a6;
    --card: #151a24;
  }

  *{margin:0; padding:0; box-sizing:border-box;}

  html, body, #root {height:100%;}

  body {
    font-family: 'Outfit', system-ui, sans-serif;
    color: var(--text);
    background: linear-gradient(270deg, var(--bg1), var(--bg2), #0a1320);
    background-size: 400% 400%;
    animation: ${bgMove} 12s ease infinite;
    -webkit-font-smoothing: antialiased;
  }

  button,input,textarea{font-family:inherit;}
`;
