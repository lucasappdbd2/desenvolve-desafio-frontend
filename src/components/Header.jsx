import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStore, FaShoppingCart } from 'react-icons/fa';
import useCart from '../hooks/useCart';

const HeaderContainer = styled.header`
  padding:1rem 2rem;
  background:#fff;
  box-shadow:0 2px 4px rgba(0,0,0,.1);
  display:flex; justify-content:space-between; align-items:center;
`;
const LogoLink = styled(Link)`
  display:flex; align-items:center; text-decoration:none; color:#333;
  h1 { margin-left:.5rem; font-size:1.4rem; }
`;

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <HeaderContainer>
      <LogoLink to="/">
        <FaStore size={28} />
        <h1>Portal de Compras</h1>
      </LogoLink>

      {/* Navegação */}
      <nav style={{ display: 'flex', gap: '.8rem' }}>
        <Link to="/">Home</Link>
        <Link to="/cart" style={{ position: 'relative' }}>
          <FaShoppingCart size={24} color='#333'/>
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#e53e3e',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {itemCount}
            </span>
          )}
        </Link>
      </nav>
    </HeaderContainer>
  );
}