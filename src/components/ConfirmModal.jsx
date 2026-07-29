import React, { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;                     /* top:0; right:0; bottom:0; left:0; */
  background: rgba(0,0,0,.4);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1000;
`;

const Dialog = styled.div`
  background: ${props => props.theme.foreground};
  padding:2rem;
  border-radius:8px;
  width:90%;
  max-width:420px;
  text-align:center;
  box-shadow:0 4px 12px rgba(0,0,0,.15);
`;

const Buttons = styled.div`
  margin-top:1.5rem;
  display:flex;
  gap:.8rem;
  justify-content:center;

  button {
    padding:.6rem 1.2rem;
    border:none;
    cursor:pointer;
    font-weight:bold;
    border-radius:4px;
    transition:background .2s;
  }
  .yes { background:#38a169; color:white; &:hover{background:#2f855a;} }
  .no  { background:#e53e3e; color:white; &:hover{background:#c53030;} }
`;

export default function ConfirmModal({
  title = 'Tem certeza?',
  onConfirm,
  onCancel,
}) {
  /* fechar com ESC */
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCancel]);

  return (
    <Overlay>
      <Dialog>
        <h3>{title}</h3>
        <Buttons>
          <button className="yes" onClick={onConfirm}>Sim</button>
          <button className="no"  onClick={onCancel}>Não</button>
        </Buttons>
      </Dialog>
    </Overlay>
  );
}