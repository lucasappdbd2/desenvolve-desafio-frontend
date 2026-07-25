import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useProduct from '../hooks/useProduct';
import useCart from '../hooks/useCart';

const Container = styled.div`
  padding:2rem;
`;
const Img = styled.img`
  max-width:400px; width:100%; object-fit:contain;
`;

const Price = styled.h3`color:#805ad5;font-weight:bold;margin:0`;

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    alert("Produto adicionado ao carrinho!");
  };  

  if (loading) return <p>Carregando…</p>;
  if (error)   return <p style={{color:'red'}}>Erro ao carregar.</p>;

  return (
    <Container>
      <h2>{product.title}</h2>
      <Img src={product.image} alt={product.title}/>
      <Price>R$ {Number(product.price).toFixed(2)}</Price>
      <p>{product.description}</p>
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: '.5rem',
          padding: '.4rem .8rem',
          border: 'none',
          background: '#805ad5',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
      Adicionar ao Carrinho
      </button>
    </Container>
  );
}
