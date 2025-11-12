import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  flex: 1;
  min-width: 120px;
  background: #1c2230;
  border-radius: 1rem;
  padding: 0.8rem;
  text-align: center;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.2);

  h4 { font-size: 0.9rem; color: var(--muted); }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 0.4rem;

    svg { margin-right: 5px; }
  }

  .up { color: var(--accent2); }
  .down { color: var(--danger); }
`;
