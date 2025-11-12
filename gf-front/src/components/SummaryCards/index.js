import React from "react";
import { Wrapper, Card } from "./style";

export default function SummaryCards({ entradas, saidas, saldo, icons }) {
  return (
    <Wrapper>
      <Card>
        <h4>Entradas</h4>
        <span className="up">{icons.up} R$ {entradas.toFixed(2)}</span>
      </Card>
      <Card>
        <h4>Saídas</h4>
        <span className="down">{icons.down} R$ {saidas.toFixed(2)}</span>
      </Card>
      <Card>
        <h4>Saldo</h4>
        <span className={saldo >= 0 ? "up" : "down"}>R$ {saldo.toFixed(2)}</span>
      </Card>
    </Wrapper>
  );
}
