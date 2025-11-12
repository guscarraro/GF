import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Input = styled.input`
  padding: 0.7rem;
  border: none;
  border-radius: 0.6rem;
  background: #1c2230;
  color: var(--text);
  outline: none;
`;

export const Select = styled.select`
  padding: 0.7rem;
  border: none;
  border-radius: 0.6rem;
  background: #1c2230;
  color: var(--text);
`;

export const Button = styled.button`
  padding: 0.8rem;
  background: var(--accent);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 0.6rem;
  transition: 0.3s;
  &:active { transform: scale(0.97); }
`;
