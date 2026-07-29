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

const ButtonUsers = styled.button`
  color: ${props => props.theme.text};
  width:100%;
  padding:.75rem .9rem;
  background: ${props => props.theme.background};
  border-radius:4px;
  border:1px solid ${props => props.theme.secondary};
  cursor:pointer;
  margin-top:1rem;
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

const ErrorMsg = styled.p`color:red;text-align:center;margin-top:2rem;`;

// Modal
const Overlay = styled.div`
  position:fixed;
  inset:0; background:rgba(0,0,0,.4);
  display:flex; align-items:center; justify-content:center; z-index:1000;
`;
const ModalBox = styled.div`
  background:${props => props.theme.background}; padding:2rem; border-radius:8px; max-width:360px; width:25rem;
  position:relative;
  box-shadow:0 4px 12px rgba(0,0,0,.15);

    a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    display: inline-flex;
    align-items: center;

    &:hover {
      opacity: .7;
    }
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  position: absolute;
  top: .5rem;
  right: .5rem;
  cursor: pointer;
`;

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate   = useNavigate();

  /* Dados do formulário */
  const [email, setEmail]          = useState('');
  const [password, setPassword]    = useState('');
  const [error, setError]          = useState('');

  /* Modal “ver lista de usuários” */
  const [showHelp, setShowHelp]   = useState(false);
  const [users, setUsers]         = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await login({ email, password });
    if (ok) navigate('/');
    else setError('E‑mail ou senha inválidos.');
  }

  /* Abrir / Fechar “lista de usuários” */
  async function toggleHelp() {
    if (!showHelp && users.length === 0) {
      setLoadingUsers(true);
      try {
        const res = await fetch('https://fakestoreapi.com/users');
        const data = await res.json();
        // Mantém apenas id, email e password (já existem no JSON)
        setUsers(data.map(u => ({ id: u.id, email: u.email, password: u.password })));
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar a lista de usuários.');
      } finally {
        setLoadingUsers(false);
      }
    }
    setShowHelp(!showHelp);
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

          {/* Botão “ver lista de usuários”*/}
          <ButtonUsers
            onClick={toggleHelp}
          >
            Ver lista de usuários e senhas
          </ButtonUsers>

          {/* Modal lista de usuários */}
          {showHelp && (
            <Overlay onClick={toggleHelp}>
              <ModalBox onClick={e=>e.stopPropagation()}>
                <h3 style={{marginBottom:'1rem'}}>Lista de usuários e senhas</h3>

                {loadingUsers ? (
                  <p>Carregando…</p>
                ) : (
                  <ul style={{maxHeight:'300px', overflowY:'auto'}}>
                    {users.map(u => (
                      <li key={u.id} style={{marginBottom:'.5rem'}}>
                        <strong>{u.email}</strong> /{' '}
                        <code>{u.password}</code>
                      </li>
                    ))}
                  </ul>
                )}

                <span>Fonte: </span>
                <a href='https://fakestoreapi.com/users'>https://fakestoreapi.com/users</a>

                <CloseBtn onClick={toggleHelp}>✕</CloseBtn>
              </ModalBox>
            </Overlay>
          )}
        </Container>
      </Content>
      <Footer />
    </Wrapper>
  );
}