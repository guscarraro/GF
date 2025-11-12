import React, { useState } from "react";
import { GlobalStyle } from "./styles/global";
import Login from "./pages/Login";
import Lancamentos from "./pages/Lancamentos";

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("gf_key"));

  if (!auth) {
    return (
      <>
        <GlobalStyle />
        <Login onSuccess={() => setAuth(true)} />
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
       
       <Lancamentos />
    </>
  );
}
