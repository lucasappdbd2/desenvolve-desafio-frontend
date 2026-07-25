import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Card = styled.div`
  border:1px solid #e2e8f0;
  padding:1rem; background:#fff;
  border-radius:8px; text-align:center;
  transition:transform .2s;
  &:hover{ transform: translateY(-4px); }
`;
const Img = styled.img`
  width:100%; height:150px; object-fit:contain; margin-bottom:.75rem;
`;
const Title = styled.h3`font-size:1rem;color:#2d3748;margin:0.5rem 0;`;
const Price = styled.p`color:#805ad5;font-weight:bold;margin:0`;

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration:'none', color:'inherit' }}>
      <Card>
        <Img src={product.image} alt={product.title}/>
        <Title>{product.title}</Title>
        <Price>R$ {Number(product.price).toFixed(2)}</Price>

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
      </Card>
    </Link>
  );
}