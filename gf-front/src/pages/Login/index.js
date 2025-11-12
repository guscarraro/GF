import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../utils/api";
import {
  Screen, Bg, Lights, Noise, Card, Title, Sub,
  Phrase, Form, Input, Button, Ghost, ErrorMsg, Footer, Spinner
} from "./style";

export default function Login() {
  const phrases = useMemo(() => ([
    "O que vocês estão gastando aí? Isso era mesmo necessário?",
    "Tá na hora de economizar, jaguara!",
    "Cartão não é varinha mágica. Respira e confirma a senha 😅",
    "Controle hoje, sossego amanhã. Bora?",
    "Meta do mês: gastar menos que o mês passado. Topa?"
  ]), []);

  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const n = phrases.length;
    const rand = Math.floor(Math.random() * n);
    setPhraseIndex(rand);
  }, [phrases]);

  function nextPhrase() {
    const n = phrases.length;
    let i = phraseIndex;
    for (let step = 0; step < 1; step++) {
      i = (i + 1) % n;
    }
    setPhraseIndex(i);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    const pwd = key.trim();
    if (!pwd) { setErr("Informe a palavra-chave."); nextPhrase(); return; }

    setLoading(true);
    try {
      await apiFetch("/auth/login", { method: "POST", headers: { "x-api-key": pwd } });
      localStorage.setItem("gf_key", pwd);
      window.location.assign("/lancamentos");
    } catch {
      setErr("Chave inválida. Tenta outra…");
      nextPhrase();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Bg />
      <Lights />
      <Noise />
      <Card>
        <Title>GF • Gestão Financeira</Title>
        <Sub>Entrar com a palavra-chave</Sub>
        <Phrase>{phrases[phraseIndex]}</Phrase>

        <Form onSubmit={handleLogin}>
          <Input
            type="password"
            placeholder="••••••••"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoComplete="current-password"
          />
          <Button disabled={loading}>
            {loading ? (<><Spinner /> Verificando…</>) : "Entrar"}
          </Button>
          <Ghost type="button" onClick={() => { setKey(""); nextPhrase(); }}>
            Limpar
          </Ghost>
          {err && <ErrorMsg>{err}</ErrorMsg>}
        </Form>

        <Footer>Mobile • Seguro • Rápido</Footer>
      </Card>
    </Screen>
  );
}
