import React from "react";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Lancamentos from "./pages/Lancamentos";

function Protected({ children }) {
  const hasKey = !!localStorage.getItem("gf_key");
  return hasKey ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/lancamentos" element={<Protected><Lancamentos /></Protected>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
