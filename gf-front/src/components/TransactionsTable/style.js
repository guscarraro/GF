import styled, { keyframes, css } from "styled-components";

export const TableWrapper = styled.div`
  max-height: 260px;
  overflow-y: auto;

  /* card mais orgânico */
  border-radius: 0.9rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: #020617;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.55);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  border-radius: 0.9rem;
  overflow: hidden;

  thead {
    position: sticky;
    top: 0;
    background: #0b1120;
    z-index: 2;
  }

  th,
  td {
    padding: 0;
  }

  th {
    padding: 0.35rem 0.5rem;
    text-align: left;
    color: var(--muted);
    font-weight: 500;
    font-size: 0.75rem;
  }
`;

export const SwipeRow = styled.tr`
  position: relative;
  cursor: ${({ $isDeleting }) => ($isDeleting ? "wait" : "grab")};

  &:active {
    cursor: ${({ $isDeleting }) => ($isDeleting ? "wait" : "grabbing")};
  }
`;

export const RowShell = styled.div`
  position: relative;
  overflow: hidden;
  background: #020617;
  transition: opacity 0.15s ease-out, filter 0.15s ease-out;

  ${({ $isDeleting }) =>
    $isDeleting &&
    css`
      opacity: 0.5;
      filter: grayscale(0.3);
    `}
`;

/* grid interno com 5 colunas alinhadas ao header */
export const RowCells = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 0.9fr 2fr 1.4fr 1.1fr 1.1fr;
  column-gap: 0.4rem;
  align-items: center;
  padding: 0.35rem 0.5rem;
  transition: transform 0.12s ease-out;
  will-change: transform;
  color: #e5e7eb;
`;

/* fundo vermelho ocupando toda a linha, por trás */
export const SwipeBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: rgba(248, 113, 113, 0.9);
  opacity: ${({ $swipeProgress }) =>
    $swipeProgress && $swipeProgress > 0 ? 0.25 + $swipeProgress * 0.5 : 0};
  transition: opacity 0.12s ease-out;
`;

const pulse = keyframes`
  0%   { transform: translateY(-50%) scale(1);   opacity: 0.9; }
  50%  { transform: translateY(-50%) scale(1.07); opacity: 1; }
  100% { transform: translateY(-50%) scale(1);   opacity: 0.9; }
`;

/* ícone de lixeira fixo à esquerda, atrás do conteúdo */
export const DeleteHint = styled.div`
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.95);
  color: #fecaca;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.15s ease-out;
  z-index: 1;

  ${({ $isDeleting }) =>
    $isDeleting &&
    css`
      animation: ${pulse} 0.9s infinite;
    `};

  svg {
    font-size: 1rem;
  }
`;

export const CellValor = styled.span`
  justify-self: end;
  font-weight: 600;
  color: ${({ $entrada }) => ($entrada ? "#4ade80" : "#f97373")};
`;

export const ChipTipo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  font-size: 0.7rem;
  background: ${(p) =>
    p.$entrada ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"};
  color: ${(p) => (p.$entrada ? "#4ade80" : "#f97373")};
`;

export const Empty = styled.div`
  font-size: 0.8rem;
  text-align: center;
  color: var(--muted);
  padding: 1rem 0.5rem;
`;
