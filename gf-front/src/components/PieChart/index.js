import React, { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  LegendList,
  LegendItem,
  OverInfo,
  SelectedTitle,
  ChartWrapper,
  InnerValue,
} from "./style";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// registra tudo de uma vez
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// metas fixas em percentual (não mais valor fixo)
const METAS = [
  { categoria: "Moradia (fixo + taxas)", percentual: 15 },
  { categoria: "Alimentação e lazer", percentual: 12 },
  { categoria: "Cartão (controle de gastos gerais)", percentual: 30 },
  { categoria: "Amortização do apê", percentual: 18 },
  { categoria: "Consórcio carro atual (130 mil)", percentual: 10 },
  { categoria: "Fundo carro secundário (40k)", percentual: 5 },
  { categoria: "Investimentos e reserva (férias/emergência)", percentual: 10 },
];

const COLORS = [
  "#22c55e",
  "#6366f1",
  "#facc15",
  "#ef4444",
  "#0ea5e9",
  "#a855f7",
  "#fb923c",
];

export default function PieChart({
  transactions,
  data,
  receitaMes = 0,
  onSelectCategory,
}) {
  // compat: tanto <PieChart transactions={...} /> quanto <PieChart data={...} />
  const txs = transactions || data || [];
  const [activeIndex, setActiveIndex] = useState(null);

  const receita = Number(receitaMes) || 0;

  // total gasto por categoria (saída)
  const { realPorCategoria, totalSaidas } = useMemo(() => {
    const map = {};
    let total = 0;
    for (let i = 0; i < txs.length; i++) {
      const t = txs[i];
      if (t.tipo !== "saida") continue;
      const cat = t.categoria || "Outros";
      const v = Number(t.valor) || 0;
      if (!map[cat]) map[cat] = 0;
      map[cat] += v;
      total += v;
    }
    return { realPorCategoria: map, totalSaidas: total };
  }, [txs]);

  // labels fixas das metas
  const labels = METAS.map((m) => m.categoria);

  // metas em R$ baseadas na receita do mês
  const metaValores = METAS.map((m) => (receita * m.percentual) / 100);

  const realValores = labels.map((cat) => {
    return realPorCategoria[cat] ? realPorCategoria[cat] : 0;
  });

  // cálculo de extrapolação (total)
  let totalMeta = 0;
  for (let i = 0; i < metaValores.length; i++) {
    totalMeta += metaValores[i];
  }
  const extrapolado = totalSaidas - totalMeta;

  // cores com destaque na categoria ativa
  const realColors = labels.map((_, idx) => {
    const base = COLORS[idx % COLORS.length];
    if (activeIndex === null) return base;
    return idx === activeIndex ? base : `${base}40`;
  });

  const metaColors = labels.map((_, idx) => {
    const base = COLORS[idx % COLORS.length];
    if (activeIndex === null) return `${base}80`;
    return idx === activeIndex ? `${base}99` : `${base}30`;
  });

  const dataChart = {
    labels,
    datasets: [
      {
        // inner ring -> metas (SEM datalabels, vamos desenhar via DOM)
        label: "Meta (R$)",
        data: metaValores,
        backgroundColor: metaColors,
        borderWidth: 0,
        hoverOffset: 2,
        offset: (ctx) =>
          activeIndex !== null && ctx.dataIndex === activeIndex ? 4 : 0,
      },
      {
        // outer ring -> real (com datalabels do lado de fora)
        label: "Real (R$)",
        data: realValores,
        backgroundColor: realColors,
        borderWidth: 0,
        hoverOffset: 6,
        offset: (ctx) =>
          activeIndex !== null && ctx.dataIndex === activeIndex ? 8 : 0,
      },
    ],
  };

  // pré-cálculo das posições dos textos do anel interno (Meta) via DOM
  let acumulado = 0;
  const innerMetaLabels =
    totalMeta > 0
      ? metaValores.map((valor, idx) => {
          const v = Number(valor) || 0;
          if (v <= 0) {
            acumulado += v;
            return null;
          }

          // mesmo esquema de ângulo do Chart.js: começa em -90°
          const startAngle =
            (acumulado / totalMeta) * 2 * Math.PI - Math.PI / 2;
          const endAngle =
            ((acumulado + v) / totalMeta) * 2 * Math.PI - Math.PI / 2;
          const angle = (startAngle + endAngle) / 2;
          acumulado += v;

          // raio em % relativo ao wrapper (0–50). 28 deixa bem dentro do anel interno
          const radiusPercent = 28;
          const x = 50 + radiusPercent * Math.cos(angle);
          const y = 50 + radiusPercent * Math.sin(angle);

          return {
            idx,
            x,
            y,
            valor: v,
          };
        })
      : [];

  // categoria selecionada
  const categoriaAtiva =
    activeIndex === null ? null : METAS[activeIndex]?.categoria;

  const metaAtiva = categoriaAtiva ? METAS[activeIndex] : null;
  const realAtivo = categoriaAtiva ? realPorCategoria[categoriaAtiva] || 0 : 0;
  const metaValorAtivo =
    categoriaAtiva && metaAtiva ? metaValores[activeIndex] || 0 : 0;
  const diffAtivo = realAtivo - metaValorAtivo;

  function handleLegendClick(idx) {
    setActiveIndex((current) => {
      const novoAtivo = current === idx ? null : idx;

      if (onSelectCategory) {
        if (novoAtivo === null) {
          onSelectCategory(null);
        } else {
          onSelectCategory(METAS[novoAtivo].categoria);
        }
      }

      return novoAtivo;
    });
  }

  return (
    <Card>
      <h4>Metas x Gastos Reais</h4>

      <SelectedTitle>
        {categoriaAtiva ? categoriaAtiva : "Todas as categorias"}
      </SelectedTitle>

      <ChartWrapper>
        <Doughnut
          data={dataChart}
          options={{
            cutout: "50%",
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 800,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(context) {
                    const label = context.dataset.label || "";
                    const value = context.parsed || 0;
                    const cat = context.label || "";
                    return `${cat} • ${label}: R$ ${value.toFixed(2)}`;
                  },
                },
              },
              datalabels: {
                color: "white", // <<< ESTA LINHA AQUI
                formatter: (value) => `R$ ${value.toFixed(0)}`, // (se quiser R$ dentro também)
              },
            },
            onClick: (_, elements) => {
              if (!elements || elements.length === 0) return;
              const { index } = elements[0];
              handleLegendClick(index);
            },
          }}
        />

        {/* labels do anel interno (Meta) via DOM, dentro da fatia */}
      </ChartWrapper>

      <LegendList>
        {METAS.map((m, idx) => {
          const real = realPorCategoria[m.categoria] || 0;
          const metaValor = metaValores[idx] || 0;
          const diff = real - metaValor;
          const estourou = diff > 0.5;
          const ativo = activeIndex === idx;

          return (
            <LegendItem
              key={m.categoria}
              $active={ativo}
              onClick={() => handleLegendClick(idx)}
            >
              <span
                className="dot"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <div className="info">
                <strong>{m.categoria}</strong>
                <small>
                  Meta R$ {metaValor.toFixed(2)} • Real R$ {real.toFixed(2)}
                </small>
              </div>
              {estourou && <span className="over">+R$ {diff.toFixed(2)}</span>}
            </LegendItem>
          );
        })}
      </LegendList>

      <OverInfo $over={extrapolado > 0} $focused={!!categoriaAtiva}>
        {categoriaAtiva && metaAtiva ? (
          diffAtivo > 0 ? (
            <>
              Na categoria "{categoriaAtiva}" vocês estouraram a meta em R${" "}
              {diffAtivo.toFixed(2)}. Respira e revê essa linha aí 😅
            </>
          ) : (
            <>
              Na categoria "{categoriaAtiva}" ainda tem folga de R${" "}
              {Math.abs(diffAtivo).toFixed(2)}. Aqui vocês estão de parabéns 👏
            </>
          )
        ) : extrapolado > 0 ? (
          <>
            Vocês extrapolaram a meta total em R$ {extrapolado.toFixed(2)}.
            Respira e revisa esse cartão aí 😅
          </>
        ) : (
          <>
            Dentro da meta total! Ainda tem folga de R${" "}
            {Math.abs(extrapolado).toFixed(2)} no mês.
          </>
        )}
      </OverInfo>
    </Card>
  );
}
