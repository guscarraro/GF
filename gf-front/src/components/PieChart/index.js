import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "./style";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  const categorias = [...new Set(data.map((d) => d.categoria))];
  const totals = categorias.map(
    (cat) => data.filter((d) => d.categoria === cat).reduce((s, x) => s + parseFloat(x.valor), 0)
  );

  const chartData = {
    labels: categorias,
    datasets: [
      {
        data: totals,
        backgroundColor: ["#22c55e", "#6366f1", "#facc15", "#ef4444", "#14b8a6"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card>
      <h4>Distribuição de Gastos</h4>
      <Doughnut
        data={chartData}
        options={{
          cutout: "70%",
          plugins: { legend: { position: "bottom", labels: { color: "#ccc" } } },
        }}
      />
    </Card>
  );
}
