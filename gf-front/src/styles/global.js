import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0b0f14; --card: #11161d; --muted: #7b8794;
    --text: #e8edf3; --acc: #4f46e5; --acc-2:#22c55e; --danger:#ef4444;
  }
  *{margin:0; padding:0; box-sizing:border-box;}
  html, body, #root { height:100%; }
  body{
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    font-family: Inter, system-ui, Arial, sans-serif;
  }
  button{ cursor:pointer; }
`;
