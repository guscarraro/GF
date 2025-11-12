import styled from "styled-components";

const Wrap = styled.div`display:flex; flex-direction:column; gap:8px;`;
const Label = styled.label`font-size:14px; color:var(--muted);`;
const Input = styled.input`
  width:100%; padding:14px 16px; border-radius:14px; border:1px solid #1f2937;
  background:#0f1319; color:var(--text); font-size:16px; outline:none;
  &:focus{ border-color: var(--acc); box-shadow: 0 0 0 4px rgba(79,70,229,.15); }
`;

export default function TextInput({ label, ...props }) {
  return (
    <Wrap>
      {label && <Label>{label}</Label>}
      <Input {...props} />
    </Wrap>
  );
}
