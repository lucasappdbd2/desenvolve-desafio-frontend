import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`  
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  padding: 2rem;
  align-items: center;
  justify-content: center;

  p {
  margin: 0;
  }

  button {
    padding: .4rem .8rem;
    border: none;
    background:#e2e8f0;
    color:#2d3748;
    cursor:pointer;
    border-radius: 4px;
    font-size:.9rem;
    
    &.active, &:hover { background:#805ad5; color:white; }
  }
`;

export default function CategoryFilter({ categories = [], selected, onSelect }) {
  return (
    <FilterContainer>
      <p>Selecionar Categoria:</p>
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