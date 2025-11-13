import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 0.6rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Label = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  color: var(--muted);
  gap: 0.2rem;
`;

export const Input = styled.input`
  padding: 0.7rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #1a2230;
  color: var(--text);
  outline: none;
  font-size: 0.9rem;
`;

export const Select = styled.select`
  padding: 0.7rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #1a2230;
  color: var(--text);
  font-size: 0.9rem;
`;

export const Button = styled.button`
  margin-top: 0.2rem;
  padding: 0.8rem;
  border-radius: 0.9rem;
  border: none;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  &:active {
    transform: scale(0.98);
  }
`;
