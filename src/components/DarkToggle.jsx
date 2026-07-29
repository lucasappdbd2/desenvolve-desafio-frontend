import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../hooks/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 0.6rem;    /* espaço antes do carrinho */
  color: inherit;

  display: flex;
  align-items: center;

  &:hover {
    opacity: .7;
  }

  svg { width: 20px; height: 20px; }
`;

export default function DarkToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Button onClick={toggleTheme} title="Alternar tema">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
}