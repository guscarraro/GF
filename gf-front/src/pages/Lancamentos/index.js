import React, { useEffect, useState } from "react";
import { Container, Header, Section } from "./style";
import LaunchForm from "../../components/LaunchForm";
import PieChart from "../../components/PieChart";
import SummaryCards from "../../components/SummaryCards";
import { GlobalStyle } from "../../styles/global";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function Lancamentos() {
  const [transactions, setTransactions] = useState([]);

  const handleAdd = (novo) => setTransactions((prev) => [...prev, novo]);

  const entradas = transactions.filter((t) => t.tipo === "entrada").reduce((s, t) => s + parseFloat(t.valor), 0);
  const saidas = transactions.filter((t) => t.tipo === "saida").reduce((s, t) => s + parseFloat(t.valor), 0);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h2>Meus Lançamentos 💸</h2>
          <p>Controle seus gastos e receitas com estilo</p>
        </Header>

        <Section>
          <LaunchForm onAdd={handleAdd} />
          <PieChart data={transactions} />
        </Section>

        <Section>
          <SummaryCards
            entradas={entradas}
            saidas={saidas}
            saldo={entradas - saidas}
            icons={{ up: <FiTrendingUp />, down: <FiTrendingDown /> }}
          />
        </Section>
      </Container>
    </>
  );
}
