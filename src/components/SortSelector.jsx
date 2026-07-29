import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;

  label {
    font-weight:600;
    margin-right:.3rem;
  }

  select {
    padding:.4rem .8rem;
    border-radius:4px;
    border:1px solid ${props => props.theme.secondary};
    background:#fff;
    color:${props => props.theme.text};
    cursor:pointer;
    background: ${props => props.theme.background};

    &:focus { outline:none; }

    @media (max-width:250px) {
      width:100%;
    }
  }
`;

export default function SortSelector({ selected, onSelect }) {
  return (
    <Container>
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" value={selected} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Padrão</option>
        <option value="price-asc">Preço (crescente)</option>
        <option value="price-desc">Preço (decrescente)</option>
        <option value="name-asc">Nome (A → Z)</option>
        <option value="name-desc">Nome (Z → A)</option>
      </select>
    </Container>
  );
}