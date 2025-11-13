import styled from "styled-components";

export const Card = styled.div`
  background: var(--card);
  border-radius: 1.2rem;
  padding: 1.2rem;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h4 {
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.03em;
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  height: 260px;

  canvas {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 768px) {
    height: 300px;
  }
`;

export const InnerValue = styled.div`
  position: absolute;
  z-index: 2;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  color: #f9fafb;
  pointer-events: none;
  white-space: nowrap;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
`;

export const SelectedTitle = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: var(--muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const LegendList = styled.div`
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--muted);
  padding: 0.35rem 0.55rem;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
  background: ${(p) => (p.$active ? "rgba(79, 70, 229, 0.16)" : "transparent")};
  transform: ${(p) => (p.$active ? "scale(1.02)" : "scale(1)")};
  border: 1px solid
    ${(p) => (p.$active ? "rgba(129, 140, 248, 0.5)" : "transparent")};
  opacity: ${(p) => (p.$active ? 1 : 0.75)};

  &:active {
    transform: scale(0.99);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
  }

  .info {
    flex: 1;
    strong {
      display: block;
      color: var(--text);
      font-size: 0.8rem;
    }
  }

  .over {
    color: #f97373;
    font-weight: 600;
    font-size: 0.78rem;
    white-space: nowrap;
  }
`;

export const OverInfo = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  text-align: center;
  color: ${(p) => (p.$over ? "#f97373" : "#4ade80")};
  opacity: ${(p) => (p.$focused ? 1 : 0.9)};
`;
