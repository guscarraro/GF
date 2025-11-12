import React, { useState } from "react";
import { Form, Input, Select, Button } from "./style";

export default function LaunchForm({ onAdd }) {
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tipo: "saida",
    categoria: "Alimentação",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.descricao || !form.valor) return;
    onAdd(form);
    setForm({ descricao: "", valor: "", tipo: "saida", categoria: "Alimentação" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input placeholder="Descrição" name="descricao" value={form.descricao} onChange={handleChange} />
      <Input placeholder="Valor" name="valor" type="number" value={form.valor} onChange={handleChange} />
      <Select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </Select>
      <Select name="categoria" value={form.categoria} onChange={handleChange}>
        <option>Alimentação</option>
        <option>Moradia</option>
        <option>Lazer</option>
        <option>Saúde</option>
        <option>Outros</option>
      </Select>
      <Button type="submit">Lançar</Button>
    </Form>
  );
}
