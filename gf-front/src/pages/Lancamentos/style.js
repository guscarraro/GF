import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  p {
    color: var(--muted);
    font-size: 0.9rem;
  }
`;

export const Section = styled.section`
  background: var(--card);
  border-radius: 1.2rem;
  padding: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;
