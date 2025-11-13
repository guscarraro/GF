import React, { useEffect, useState } from "react";
import { Container, Header, Section } from "./style";
import LaunchForm from "../../components/LaunchForm";
import PieChart from "../../components/PieChart";
import SummaryCards from "../../components/SummaryCards";
import TransactionsTable from "../../components/TransactionsTable";
import { GlobalStyle } from "../../styles/global";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { GastosAPI } from "../../utils/api";

export default function Lancamentos() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // carrega lançamentos do mês atual
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const now = new Date();
        const mes = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}`;
        const data = await GastosAPI.listByMes(mes);
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar lançamentos", err);
        alert("Erro ao carregar lançamentos do mês.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // cria + adiciona na lista
  async function handleCreate(payload) {
    try {
      const created = await GastosAPI.create(payload);
      setTransactions((prev) => [...prev, created]);
    } catch (err) {
      console.error("Erro ao criar lançamento", err);
      alert("Erro ao salvar lançamento.");
    }
  }

  // excluir lançamento (usado pelo swipe da tabela)
  async function handleDelete(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este lançamento?"
    );
    if (!confirmar) return;

    try {
      await GastosAPI.remove(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao excluir lançamento", err);
      alert("Erro ao excluir lançamento.");
    }
  }

  // somatórios sem reduce
  let entradas = 0;
  let saidas = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    const val = Number(t.valor) || 0;
    if (t.tipo === "entrada") {
      entradas += val;
    } else if (t.tipo === "saida") {
      saidas += val;
    }
  }

  const saldo = entradas - saidas;

  // itens da tabela respeitando filtro da pizza
  const itemsTabela = categoriaSelecionada
    ? transactions.filter((t) => t.categoria === categoriaSelecionada)
    : transactions;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h2>Visão do Mês 💸</h2>
          <p>Metas x realidade dos gastos da casa</p>
        </Header>

        <Section>
          <LaunchForm onSubmit={handleCreate} />
        </Section>

        <Section>
          <PieChart
            transactions={transactions}
            receitaMes={entradas}
            onSelectCategory={setCategoriaSelecionada}
          />
        </Section>

        <Section>
          <SummaryCards
            entradas={entradas}
            saidas={saidas}
            saldo={saldo}
            icons={{ up: <FiTrendingUp />, down: <FiTrendingDown /> }}
          />
        </Section>

        <Section>
          <TransactionsTable
            loading={loading}
            items={itemsTabela}
            onDelete={handleDelete}
          />
        </Section>
      </Container>
    </>
  );
}
