import styled, { keyframes, createGlobalStyle } from "styled-components";

/* opcional: fonte mais moderna (Inter) – se preferir, coloque o <link> no public/index.html */
export const Font = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  * { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
`;

/* animações sutis só no background */
const gradientLoop = keyframes`
  0% { background-position: 0% 50%;}
  50% { background-position: 100% 50%;}
  100% { background-position: 0% 50%;}
`;
const pulse = keyframes`
  0% { opacity:.35; transform: scale(1); }
  50% { opacity:.55; transform: scale(1.05); }
  100% { opacity:.35; transform: scale(1); }
`;
const noiseMove = keyframes`
  0% { background-position: 0 0;}
  100% { background-position: 100% 0;}
`;

export const Screen = styled.div`
  min-height: 100dvh;
  display: grid; place-items: center;
  overflow: hidden; position: relative;
  background: #0a0f16;
`;

export const Bg = styled.div`
  position: fixed; inset: 0; z-index: 0;
  background: linear-gradient(120deg, #0b1220, #0d1626, #101b2f, #0c1423);
  background-size: 300% 300%;
  animation: ${gradientLoop} 24s ease infinite;
`;

/* luzes em “camadas” com gradientes – sem movimento brusco */
export const Lights = styled.div`
  position: fixed; inset: 0; z-index: 0; pointer-events:none;
  &::before, &::after {
    content: ""; position: absolute; filter: blur(42px);
    border-radius: 50%;
    opacity: .35; animation: ${pulse} 12s ease-in-out infinite;
  }
  &::before {
    width: 55dvw; height: 55dvw;
    left: -15%; top: -10%;
    background: radial-gradient(closest-side, rgba(99,102,241,.55), rgba(99,102,241,0));
  }
  &::after {
    width: 48dvw; height: 48dvw;
    right: -12%; bottom: -10%;
    background: radial-gradient(closest-side, rgba(34,197,94,.5), rgba(34,197,94,0));
    animation-delay: 1.2s;
  }
`;

export const Noise = styled.div`
  position: fixed; inset: 0; z-index: 0; opacity: .05; pointer-events:none;
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='80' viewBox='0 0 160 80'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter>\
<rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>");
  background-size: 300px 150px;
  animation: ${noiseMove} 14s linear infinite;
`;

/* card estático (sem shake/float), glass + borda sutil */
export const Card = styled.div`
  position: relative; z-index: 1;
  width: min(92dvw, 420px);
  background: rgba(18, 24, 32, .75);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.03);
  backdrop-filter: blur(10px);
  padding: 22px 18px 18px;
`;

export const Title = styled.h1`
  font-size: 22px; font-weight: 800; color: #ebf3ff; letter-spacing: .2px;
`;
export const Sub = styled.p`
  margin-top: 4px; color: #9fb0c8; font-size: 13px;
`;

export const Phrase = styled.div`
  margin: 12px 0 16px; font-size: 13px; line-height: 1.45; color: #c7d6ee;
  background: rgba(255,255,255,.04);
  border: 1px dashed rgba(255,255,255,.12);
  border-radius: 14px; padding: 10px 12px;
`;

export const Form = styled.form`
  display: grid; gap: 10px;
`;

export const Input = styled.input`
  width: 100%; padding: 14px 14px; font-size: 16px; color: #e9f2ff;
  border-radius: 14px; border: 1px solid rgba(255,255,255,.08);
  background: rgba(5,8,13,.78); outline: none;
  transition: box-shadow .15s ease, border-color .15s ease, background .15s ease;
  &:focus {
    border-color: rgba(99,102,241,.8);
    box-shadow: 0 0 0 4px rgba(99,102,241,.18);
    background: rgba(7,10,16,.9);
  }
`;

export const Button = styled.button`
  display:flex; align-items:center; justify-content:center; gap:8px;
  width: 100%; padding: 14px 16px;
  border: 0; border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #7c3aed, #22c55e);
  background-size: 200% 200%;
  color: white; font-weight: 800; font-size: 16px;
  box-shadow: 0 12px 32px rgba(99,102,241,.35);
  transition: transform .06s ease, background-position .8s ease, filter .2s ease;
  &:active { transform: translateY(1px) scale(.99); }
  &:hover { background-position: 100% 0; }
  &:disabled { opacity:.7; filter: grayscale(.2); }
`;

export const Spinner = styled.span`
  width:16px; height:16px; border-radius:50%;
  border:2px solid rgba(255,255,255,.35);
  border-top-color:#fff; display:inline-block;
  animation: spin .7s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export const Ghost = styled.button`
  width: 100%; padding: 12px 14px;
  border-radius: 14px; background: transparent;
  color: #a6b7cf; border: 1px solid rgba(255,255,255,.08);
  font-weight: 600;
`;

export const ErrorMsg = styled.div`
  color: #ff8b8b;
  background: rgba(255, 0, 0, .06);
  border: 1px solid rgba(255, 0, 0, .18);
  border-radius: 12px;
  padding: 10px 12px; font-size: 13px;
`;

export const Footer = styled.div`
  margin-top: 10px; text-align: center; font-size: 12px; color: #8aa0ba; opacity: .9;
`;
