import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 2rem 0;
  background:${props => props.theme.foreground};
  color:${props => props.theme.text};
  font-size:.9rem;

  box-shadow: 0 -2px 6px rgba(0,0,0,.1);
  display:flex;
  justify-content:center;
  align-items:center;

  a {
    color:${props => props.theme.text};
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    margin-left:0.6rem;

    &:hover { opacity:.7; }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      © 2026 - Desenvolvido por 
      <a href="https://github.com/lucasappdbd2" target="_blank" rel="noopener noreferrer">
        <FaGithub size={20} style={{marginRight:'4px'}} />PDBD109
      </a>
    </FooterContainer>
  );
}