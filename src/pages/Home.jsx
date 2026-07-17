import React, { useState } from 'react';
import styled from 'styled-components';
import useProducts   from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';
import ProductCard   from '../components/ProductCard';
import Footer        from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-height:calc(100vh - 5.5rem);
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
`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data, loading, error }   = useProducts();
  const { categories, loading: catLoading } = useCategories();

  const filteredData = selectedCategory
    ? data.filter(p => p.category === selectedCategory)
    : data;

  if (loading) return <p style={{padding:'2rem'}}>Carregando…</p>;
  if (error)   return <p style={{color:'red', padding:'2rem'}}>Erro ao carregar.</p>;

  return (
    <Wrapper>
      {/* Filtro de categorias */}
      {(catLoading || categories.length === 0)
        ? <p>Carregando categorias…</p>
        : <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />}

      {/* Conteúdo principal*/}
      <Content>
        <Grid>
          {filteredData.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>

        <Footer />
      </Content>
    </Wrapper>
  );
}
