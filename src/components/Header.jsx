import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStore, FaShoppingCart, FaSignOutAlt, FaUserCircle, FaLock } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import { AuthContext } from '../hooks/AuthContext';
import { useContext } from 'react';
import DarkToggle from './DarkToggle';
import { ThemeContext } from '../hooks/ThemeContext';

const HeaderContainer = styled.header`
  padding: 1rem 2rem;
  background: ${props => props.theme.foreground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 1rem;
  }

  a {
    color: ${props => props.theme.text};
    text-decoration: none;
    display: inline-flex;
    align-items: center;

    &:hover {
      opacity: .7;
    }
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${props => props.theme.text};

  h1 {
    margin-left: 0.5rem;
    font-size: 1.4rem;
    text-align: center;
  }
`;

const LogoIcon = styled(FaStore)`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

export default function Header() {
  // Carrinho
  const { items, clearCart} = useCart();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  // Context de Usuário
  const { user, logout } = useContext(AuthContext);

  const { theme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      {/* Logo */}
      <LogoLink to="/">
        <LogoIcon />
        <h1>Portal de Compras</h1>
      </LogoLink>

      {/* Navegação principal */}
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>

        <DarkToggle />

        {/* Carrinho */}
        <Link
          to="/cart"
          style={{
            position: 'relative',
          }}
        >
          <FaShoppingCart size={24} />
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: '#e53e3e',
                color: 'white',
                borderRadius: '50%',
                width: 18,
                height: 18,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {itemCount}
            </span>
          )}
        </Link>

        {/* Login / Logout */}
        {!user ? (
          // Se não autenticado: botão de Login
          <Link
            to="/login"
            style={{
              color: theme.text,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '0.6rem',
            }}
          >
            <FaLock size={18} />
            <span style={{ marginLeft: '0.5rem' }}>Login</span>
          </Link>
        ) : (
          // Se autenticado: saudação e botão de Logout
          <>
            {/* Saudação */}
            <div style={{ display:'flex', alignItems: 'center', justifyContent: 'center'}}>
            <FaUserCircle size={18} />
            <span
              style={{
                marginLeft: '0.2rem',
                color: '${props => props.theme.text}',
                fontWeight: 600,
              }}
            >
              Olá, {user.name?.firstname || user.email}!
            </span>
            </div>

            {/* Logout */}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                clearCart(); // limpa o carrinho
                logout(); // limpa token/user
              }}
              style={{
                color: '${props => props.theme.text}',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <FaSignOutAlt size={18} />
              <span style={{ marginLeft: '0.2rem' }}>Logout</span>
            </Link>
          </>
        )}
      </nav>
    </HeaderContainer>
  );
}