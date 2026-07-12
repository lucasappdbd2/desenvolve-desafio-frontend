import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration:'none', color:'inherit' }}>
      <Card>
        <Img src={product.image} alt={product.title}/>
        <Title>{product.title}</Title>
        <Price>R$ {Number(product.price).toFixed(2)}</Price>
      </Card>
    </Link>
  );
}
