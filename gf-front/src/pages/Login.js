import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { apiFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Screen = styled.div`
  min-height:100dvh; display:flex; align-items:center; justify-content:center; padding:20px;
`;
const Col = styled.div`width:100%; max-width:420px; display:flex; flex-direction:column; gap:18px;`;
const Title = styled.h1`font-size:28px; line-height:1.1;`;
const Sub = styled.p`color:var(--muted); font-size:14px;`;
const Phrase = styled.p`
  background:#0d1218; border:1px dashed #253042; border-radius:14px;
  padding:12px 14px; font-size:13px; color:#cbd5e1;
`;

export default function Login() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    if(!key.trim()) return;
    setLoading(true);
    try{
      await apiFetch("/auth/login", { headers: { "x-api-key": key }});
      localStorage.setItem("gf_key", key);
      nav("/lancamentos", { replace:true });
    }catch(err){
      alert("Chave inválida 😬");
    }finally{ setLoading(false); }
  }

  return (
    <Screen>
      <Col>
        <Title>GF • Gestão Financeira</Title>
        <Sub>Entrar com a palavra-chave para ver/lançar suas finanças.</Sub>

        <Card as="form" onSubmit={handleLogin} style={{gap:14}}>
          <Phrase>
            “O que vocês estão gastando aí? Isso era mesmo necessário? <b>Tá na hora de economizar, jaguara!</b>” 😅
          </Phrase>
          <TextInput
            label="Palavra-chave"
            type="password"
            placeholder="••••••••"
            value={key}
            onChange={(e)=>setKey(e.target.value)}
          />
          <Button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
          <Button type="button" variant="ghost" onClick={()=>setKey("")}>Limpar</Button>
        </Card>

        <Sub style={{textAlign:"center"}}>Mobile-first • seguro • rápido</Sub>
      </Col>
    </Screen>
  );
}
