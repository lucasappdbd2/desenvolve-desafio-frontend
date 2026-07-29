import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`  
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;

  p {
  margin: 0;
  text-align:center;
  }

  button {
    padding: .4rem .8rem;
    border: none;
    background:${props => props.theme.secondary};
    color:${props => props.theme.text};
    cursor:pointer;
    border-radius: 4px;
    font-size:.9rem;
    
    &.active, &:hover { background:${props => props.theme.primary}; color:white; }
  }
`;

export default function CategoryFilter({ categories = [], selected, onSelect }) {
  return (
    <FilterContainer>
      <p style={{ fontWeight:600 }}>Selecionar Categoria:</p>
      {/* Botão “Todos” */}
      <button
        className={!selected ? 'active' : ''}
        onClick={() => onSelect('')}
      >
        Todos
      </button>

      {categories.map((c) => (
        <button
          key={c}
          className={selected === c ? 'active' : ''}
          onClick={() => onSelect(c)}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </button>
      ))}
    </FilterContainer>
  );
}