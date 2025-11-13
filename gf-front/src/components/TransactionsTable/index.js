import React, { useState } from "react";
import {
  TableWrapper,
  Table,
  ChipTipo,
  Empty,
  SwipeRow,
  SwipeBackground,
  DeleteHint,
  RowShell,
  RowCells,
  CellValor,
} from "./style";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiTrash2,
} from "react-icons/fi";

const SWIPE_DELETE_THRESHOLD = 160; // px - ajusta se quiser mais/menos arrasto

export default function TransactionsTable({ items, loading, onDelete }) {
  const [dragState, setDragState] = useState({
    id: null,
    startX: 0,
    deltaX: 0,
    dragging: false,
  });

  const [deletingId, setDeletingId] = useState(null);

  function startDrag(clientX, id) {
    if (deletingId) return; // se estiver deletando algo, não deixa começar outro swipe

    setDragState({
      id,
      startX: clientX,
      deltaX: 0,
      dragging: true,
    });
  }

  function moveDrag(clientX, id) {
    setDragState((prev) => {
      if (!prev.dragging || prev.id !== id || deletingId) return prev;
      const deltaX = Math.max(0, clientX - prev.startX); // só arrasta pra direita
      return { ...prev, deltaX };
    });
  }

  async function endDrag() {
    if (!dragState.dragging || deletingId) {
      setDragState({
        id: null,
        startX: 0,
        deltaX: 0,
        dragging: false,
      });
      return;
    }

    const shouldDelete = dragState.deltaX > SWIPE_DELETE_THRESHOLD;
    const idToDelete = dragState.id;

    // reseta o swipe visualmente
    setDragState({
      id: null,
      startX: 0,
      deltaX: 0,
      dragging: false,
    });

    if (shouldDelete && onDelete) {
      try {
        setDeletingId(idToDelete);
        const maybePromise = onDelete(idToDelete);
        if (maybePromise && typeof maybePromise.then === "function") {
          await maybePromise;
        }
      } finally {
        setDeletingId(null);
      }
    }
  }

  if (loading) {
    return <Empty>Carregando lançamentos...</Empty>;
  }

  if (!items || items.length === 0) {
    return (
      <Empty>
        Sem lançamentos ainda (ou nenhum nessa categoria). Começa registrando o
        primeiro 👍
      </Empty>
    );
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th style={{ textAlign: "right" }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t, index) => {
            const d = t.data || t.criado_em;
            const dt = d ? new Date(d) : null;
            const dataFmt = dt ? dt.toLocaleDateString("pt-BR") : "-";
            const val = Number(t.valor) || 0;
            const isEntrada = t.tipo === "entrada";

            const isActive = dragState.id === t.id;
            const delta = isActive ? dragState.deltaX : 0;
            const progress = Math.min(delta / SWIPE_DELETE_THRESHOLD, 1);
            const isDeleting = deletingId === t.id;

            return (
              <SwipeRow
                key={t.id}
                data-index={index}
                $swipeProgress={progress}
                $isDeleting={isDeleting}
                onMouseDown={(e) => startDrag(e.clientX, t.id)}
                onMouseMove={(e) =>
                  dragState.dragging && isActive && moveDrag(e.clientX, t.id)
                }
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onTouchStart={(e) =>
                  startDrag(e.touches[0].clientX, t.id)
                }
                onTouchMove={(e) =>
                  moveDrag(e.touches[0].clientX, t.id)
                }
                onTouchEnd={endDrag}
              >
                <td colSpan={5}>
                  <RowShell $isDeleting={isDeleting}>
                    {/* fundo vermelho atrás */}
                    <SwipeBackground
                      $swipeProgress={progress || (isDeleting ? 1 : 0)}
                    />

                    {/* ícone de lixeira parado atrás */}
                    <DeleteHint
                      $visible={progress > 0 || isDeleting}
                      $isDeleting={isDeleting}
                    >
                      <FiTrash2 />
                    </DeleteHint>

                    {/* conteúdo que desliza pra direita */}
                    <RowCells
                      style={{ transform: `translateX(${delta}px)` }}
                      $isDeleting={isDeleting}
                    >
                      <span>{dataFmt}</span>
                      <span>{t.descricao}</span>
                      <span>{t.categoria}</span>
                      <span>
                        <ChipTipo $entrada={isEntrada}>
                          {isEntrada ? (
                            <FiArrowUpCircle />
                          ) : (
                            <FiArrowDownCircle />
                          )}
                          {isEntrada ? "Entrada" : "Saída"}
                        </ChipTipo>
                      </span>
                      <CellValor $entrada={isEntrada}>
                        R$ {val.toFixed(2)}
                      </CellValor>
                    </RowCells>
                  </RowShell>
                </td>
              </SwipeRow>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
