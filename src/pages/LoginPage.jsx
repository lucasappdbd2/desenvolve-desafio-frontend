import { useState, useContext } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { AuthContext } from '../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 360px;
  margin: 2rem auto;
  padding: 2rem;
  background:${props => props.theme.foreground};
  border-radius:8px;
  box-shadow:0 2px 10px rgba(0,0,0,.1);
`;
const Title = styled.h2`
  margin-bottom:1.5rem;
  margin-top: 0;
  color:${props => props.theme.text};
  text-align:center;
`;

const Input = styled.input`
  color: ${props => props.theme.text};
  width:100%;
  padding:.75rem .9rem;
  background-color: ${props => props.theme.background};
  border-radius:4px;
  border:1px solid ${props => props.theme.secondary};
  margin-bottom:1rem;
  &:focus{outline:none;border-color:${props => props.theme.primary};}
  &::placeholder {
    color: ${props => props.theme.text};
    }
`;
const Button = styled.button`
  width:100%;
  padding:.75rem .9rem;
  background:${props => props.theme.primary};color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;
  &:hover{background:${props => props.theme.accent};}
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-height:calc(100vh - 5.5rem);

  @media (max-width: 680px) {
    min-height:calc(100vh - 8.0rem);
  }
`;

const Content = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  padding: 2rem;
`;

const ErrorMsg = styled.p`color:red;text-align:center;margin-top:2rem;margin-bottom:0;`;

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate   = useNavigate();

  /* Dados do formulário */
  const [email, setEmail]          = useState('');
  const [password, setPassword]    = useState('');
  const [error, setError]          = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await login({ email, password });
    if (ok) navigate('/');
    else setError('E‑mail ou senha inválidos.');
  }

  return (
    <Wrapper>
      <Content>
        <Container>
          <Title>Login</Title>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <Input
              id='login-email'
              type="email"
              placeholder="E‑mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              id='login-password'
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <Button type="submit">Entrar</Button>
          </form>

          {error && <ErrorMsg>{error}</ErrorMsg>}

        </Container>
      </Content>
      <Footer />
    </Wrapper>
  );
}