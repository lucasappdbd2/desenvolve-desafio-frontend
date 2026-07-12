import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useProduct from '../hooks/useProduct';

const Container = styled.div`
  padding:2rem;
`;
const Img = styled.img`
  max-width:400px; width:100%; object-fit:contain;
`;

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) return <p>Carregando…</p>;
  if (error)   return <p style={{color:'red'}}>Erro ao carregar.</p>;

  return (
    <Container>
      <h2>{product.title}</h2>
      <Img src={product.image} alt={product.title}/>
      <p>R$ {Number(product.price).toFixed(2)}</p>
      <p>{product.description}</p>
    </Container>
  );
}
