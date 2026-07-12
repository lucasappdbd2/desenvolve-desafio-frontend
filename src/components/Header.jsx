import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';

const HeaderContainer = styled.header`
  padding:1rem 2rem;
  background:#fff;
  box-shadow:0 2px 4px rgba(0,0,0,.1);
  display:flex; justify-content:space-between; align-items:center;
`;

const LogoLink = styled(Link)`
  display:flex; align-items:center; text-decoration:none; color:#333;
  
  h1 {
    margin-left:.5rem;
    font-size:1.4rem;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      
      <LogoLink to="/">
        <FaStore size={28} />
        <h1>Portal de Compras</h1>
      </LogoLink>
      <nav><Link to="/">Home</Link></nav>

    </HeaderContainer>
  );
}
