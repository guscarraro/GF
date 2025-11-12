import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { apiFetch } from "../utils/api";

const Wrap = styled.div`min-height:100dvh; padding:18px; display:flex; flex-direction:column; gap:16px;`;
const Row = styled.div`display:grid; grid-template-columns: 1fr; gap:12px;`;
const H = styled.h2`font-size:22px;`;
const List = styled.div`display:flex; flex-direction:column; gap:10px;`;
const Item = styled(Card)`display:flex; justify-content:space-between; align-items:center;`;

export default function Lancamentos() {
  const [form, setForm] = useState({
    data: new Date().toISOString().slice(0,10),
    descricao: "",
    categoria: "",
    tipo: "saida",
    valor: "",
    forma_pagamento: "",
    conta: "",
    recorrente: false,
    parcelas_total: 1,
    parcela_atual: 1,
    status: "pendente",
    previsao: false
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  function setField(k, v){ setForm(prev => ({ ...prev, [k]: v })); }

  async function loadMes(){
    const y = form.data.slice(0,7);
    const data = await apiFetch(`/gastos?mes=${y}`);
    setItems(data || []);
  }

  async function salvar(e){
    e.preventDefault();
    setLoading(true);
    try{
      const payload = { ...form, valor: Number(form.valor || 0) };
      await apiFetch("/gastos", { method:"POST", body: payload });
      await loadMes();
      setField("descricao",""); setField("valor",""); // limpa campos principais
    }catch(err){
      alert("Falha ao salvar");
    }finally{ setLoading(false); }
  }

  async function remover(id){
    if(!window.confirm("Remover lançamento?")) return;
    await apiFetch(`/gastos/${id}`, { method:"DELETE" });
    setItems(items.filter(x => x.id !== id));
  }

  useEffect(()=>{ loadMes(); /* on mount */ // eslint-disable-next-line
  }, []);

  return (
    <Wrap>
      <H>Lançar gasto/receita</H>
      <Card as="form" onSubmit={salvar} style={{display:"grid", gap:12}}>
        <Row>
          <TextInput label="Data" type="date" value={form.data} onChange={e=>setField("data", e.target.value)} />
          <TextInput label="Descrição" value={form.descricao} onChange={e=>setField("descricao", e.target.value)} />
          <TextInput label="Categoria" placeholder="Alimentação, Lazer..." value={form.categoria} onChange={e=>setField("categoria", e.target.value)} />
          <TextInput label="Valor (R$)" type="number" inputMode="decimal" value={form.valor} onChange={e=>setField("valor", e.target.value)} />
          <TextInput label="Tipo (entrada/saida)" value={form.tipo} onChange={e=>setField("tipo", e.target.value)} />
        </Row>
        <Row>
          <TextInput label="Forma de pagamento" value={form.forma_pagamento} onChange={e=>setField("forma_pagamento", e.target.value)} />
          <TextInput label="Conta" value={form.conta} onChange={e=>setField("conta", e.target.value)} />
          <TextInput label="Status (pago/pendente/cancelado)" value={form.status} onChange={e=>setField("status", e.target.value)} />
        </Row>
        <Button disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
      </Card>

      <H style={{marginTop:4}}>Lançamentos do mês</H>
      <List>
        {items.map(it => (
          <Item key={it.id}>
            <div>
              <b>{it.descricao}</b>
              <div style={{color:"var(--muted)", fontSize:12}}>
                {new Date(it.data).toLocaleDateString()} • {it.categoria} • {it.tipo}
              </div>
            </div>
            <div style={{display:"flex", gap:8, alignItems:"center"}}>
              <span style={{fontWeight:700}}>R$ {Number(it.valor).toFixed(2)}</span>
              <button onClick={()=>remover(it.id)} style={{
                background:"transparent", color:"var(--danger)", border:"0", fontWeight:700
              }}>Excluir</button>
            </div>
          </Item>
        ))}
      </List>
    </Wrap>
  );
}
