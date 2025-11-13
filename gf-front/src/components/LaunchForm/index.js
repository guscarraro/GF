import React, { useState } from "react";
import { Form, Row, Input, Select, Button, Label } from "./style";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function LaunchForm({ onSubmit }) {
  const [form, setForm] = useState({
    data: todayISO(),
    descricao: "",
    valor: "",
    tipo: "saida",
    categoria: "Alimentação e lazer",
    forma_pagamento: "",
    conta: "",
    parcelas_total: 1,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.descricao.trim() || !form.valor) {
      alert("Preencha descrição e valor.");
      return;
    }

    // garante inteiro >= 1
    let parcelasTotal = parseInt(form.parcelas_total, 10);
    if (isNaN(parcelasTotal) || parcelasTotal < 1) {
      parcelasTotal = 1;
    }

    // se for entrada, força 1x (parcelado faz mais sentido pra saída)
    if (form.tipo === "entrada") {
      parcelasTotal = 1;
    }

    const payload = {
      data: form.data, // YYYY-MM-DD
      descricao: form.descricao.trim(),
      categoria: form.categoria,
      tipo: form.tipo, // entrada | saida
      valor: Number(form.valor),
      forma_pagamento: form.forma_pagamento || null, // agora vem de select (débito/crédito)
      conta: form.conta || null, // agora vem de select (bancos fixos)
      recorrente: false,
      parcelas_total: parcelasTotal,
      parcela_atual: 1,
      status: "pendente",
      previsao: false,
      parent_id: null, // opcional, o back gera se precisar
    };

    await onSubmit(payload);

    setForm((prev) => ({
      ...prev,
      descricao: "",
      valor: "",
      parcelas_total: 1,
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Label>
          Data
          <Input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Tipo
          <Select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </Select>
        </Label>
      </Row>

      <Label>
        Descrição
        <Input
          placeholder="Ex: Mercado, aluguel, salário..."
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
        />
      </Label>

      <Row>
        <Label>
          Valor (R$)
          <Input
            type="number"
            step="0.01"
            min="0"
            name="valor"
            value={form.valor}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Parcelas
          <Input
            type="number"
            min="1"
            name="parcelas_total"
            value={form.parcelas_total}
            onChange={handleChange}
          />
        </Label>
      </Row>

      <Label>
        Categoria
        <Select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option>Moradia (fixo + taxas)</option>
          <option>Alimentação e lazer</option>
          <option>Cartão (controle de gastos gerais)</option>
          <option>Amortização do apê</option>
          <option>Consórcio carro atual (130 mil)</option>
          <option>Fundo carro secundário (40k)</option>
          <option>Investimentos e reserva (férias/emergência)</option>
          <option>Entrada salario</option>
        </Select>
      </Label>

      <Row>
        <Label>
          Forma pgto
          <Select
            name="forma_pagamento"
            value={form.forma_pagamento}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
          </Select>
        </Label>
        <Label>
          Conta
          <Select
            name="conta"
            value={form.conta}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Itau">Itau</option>
            <option value="C6">C6</option>
            <option value="Nubank">Nubank</option>
            <option value="Santander">Santander</option>
            <option value="Bradesco">Bradesco</option>
            <option value="Nomade">Nomade</option>
          </Select>
        </Label>
      </Row>

      <Button type="submit">Lançar</Button>
    </Form>
  );
}
