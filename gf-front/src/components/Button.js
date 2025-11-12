import styled from "styled-components";

const Btn = styled.button`
  width:100%;
  border:0; border-radius:16px; padding:14px 16px;
  background: ${(p)=>p.$variant==="ghost" ? "transparent" : "linear-gradient(135deg, var(--acc), #7c3aed)"};
  color: var(--text); font-weight: 600; font-size: 16px;
  box-shadow: ${(p)=>p.$variant==="ghost" ? "none" : "0 10px 30px rgba(79,70,229,.35)"};
  outline:2px solid transparent;
  transition: transform .06s ease, opacity .2s;
  &:active{ transform: translateY(1px) scale(.99); }
  &:disabled{ opacity:.6; pointer-events:none; }
`;
export default function Button({ children, variant, ...props }) {
  return <Btn $variant={variant} {...props}>{children}</Btn>;
}
