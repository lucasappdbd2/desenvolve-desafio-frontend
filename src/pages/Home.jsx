import styled from 'styled-components';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const Grid = styled.div`
  display:grid;
  gap:1rem;
  padding:2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export default function Home() {
  const { data, loading, error } = useProducts();

  if (loading) return <p style={{padding:'2rem'}}>Carregando…</p>;
  if (error)   return <p style={{color:'red', padding:'2rem'}}>Erro ao carregar.</p>;

  return (
    <div>
      <Grid>
        {data.map(p => <ProductCard key={p.id} product={p} />)}
      </Grid>
      <Footer />
    </div>
  );
}
