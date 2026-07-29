import React, { useState } from 'react';
import styled from 'styled-components';
import useProducts   from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';
import ProductCard   from '../components/ProductCard';
import Footer        from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';
import { useSearch } from '../hooks/SearchContext';
import { useCallback, useRef } from 'react';
import SortSelector from '../components/SortSelector';

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-height:calc(100vh - 5.5rem);
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content:space-between;

  /* ---- Responsividade ---- */

    @media (max-width: 1700px) {
    justify-content:center;
    align-items: center;
  }


  @media (max-width: 600px) {
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content:center;

  /* ---- Responsividade ---- */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

// --------- Campo de busca ----------
const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;

  input {
    color: ${props => props.theme.text};
    padding: .45rem .8rem;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.secondary};
    font-size: .9rem;
    width: 36em;
    background-color: ${props => props.theme.background};
    transition: border-color .15s ease-in-out;

    box-shadow: inset 0 1px 2px rgba(0,0,0,.05);
    transition: all .15s ease-in-out;
    &:focus { outline:none; border-color:${props => props.theme.primary}; box-shadow: 0 0 0 3px rgba(128,90,213,.25); }
    &::placeholder { color: ${props => props.theme.text}; opacity: .85; }
  }

  @media (max-width: 600px) {
    input {
      width: 100%;
      align-items: center;
      justify-content: center;
      }
  }
`;

const Content = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
`;

const Grid = styled.div`
  display:grid;
  gap:1rem;
  padding:2rem;
  padding-top:0;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  flex:1;
  @media (max-width: 350px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  const { query } = useSearch();

  const { data, loading, error }   = useProducts();
  const { categories, loading: catLoading } = useCategories();

  /* ---------- Filtra por categoria e busca ----------
   * 1. Categoria (se houver)
   * 2. Busca por título
   */
  let filteredData = selectedCategory
    ? data.filter(p => p.category === selectedCategory)
    : data;

  if (query) {
    const lower = query.toLowerCase();
    filteredData = filteredData.filter(p =>
      p.title.toLowerCase().includes(lower)
    );
  }

    /* ---------- Search Hook ---------- */
    const { setQuery } = useSearch();
  
    // Debounce (300ms)
    const debounceTimer = useRef(null);
    const onInputChange = useCallback((e) => {
      const value = e.target.value;
  
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
  
      debounceTimer.current = setTimeout(() => {
        setQuery(value.trim());
      }, 300);
    }, [setQuery]);

  // Ordenação
  const sortedData = [...filteredData];

  switch (sortOption) {
    case 'price-asc':
      sortedData.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedData.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      /* nenhuma ordenação selecionada – mantém a ordem original */
  }

  if (loading) {
    return (
      <Wrapper>
        <Content>
          <div style={{ display: 'flex', justifyContent: 'center',  textAlign: 'center'}}>
            <p style={{ padding: '2rem' }}>Carregando…</p>
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  };

  if (error) {
    return (
      <Wrapper>
        <Content>
          <div style={{ display: 'flex', justifyContent: 'center',  textAlign: 'center'}}>
            <p style={{ color: 'red', padding: '2rem' }}>Erro ao carregar.</p>
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  };

  return (
    <Wrapper>
      {/* Filtros: categoria + ordenação */}
      {(catLoading || categories.length === 0) ? (
        <p>Carregando categorias…</p>
      ) : (
        <FilterWrapper>
          {/* Filtro por categoria */}
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <SearchContainer>
            {/* Barra de Busca */}
            <SearchWrapper>
              <input id='searchbar'
              type="text"
              placeholder="Buscar produtos…"
              onChange={onInputChange}
              />
            </SearchWrapper>

            {/* Filtro de ordenação */}
            <SortSelector
              selected={sortOption}
              onSelect={setSortOption}
            />
          </SearchContainer>

        </FilterWrapper>
      )}


      {/* Conteúdo principal*/}
      <Content>

        <Grid>
          {sortedData.length > 0 ? (
          sortedData.map(p => (
            <ProductCard key={p.id} product={p} />
          ))
          ) : (
            <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            Nenhum produto encontrado.
            </span>
          )}
        </Grid>
        
      </Content>
      <Footer />
    </Wrapper>
  );
}