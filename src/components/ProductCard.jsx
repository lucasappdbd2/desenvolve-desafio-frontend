import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Card = styled.div`
  border:1px solid ${props => props.theme.secondary};
  padding:1rem; background:${props => props.theme.foreground};
  border-radius:8px; text-align:center;
  transition:transform .2s;
  &:hover{ transform: translateY(-4px); }
`;
const Img = styled.img`
  width:100%; height:150px; object-fit:contain; margin-bottom:.75rem;
`;
const Title = styled.h3`font-size:1rem;color:${props => props.theme.text};margin:0.5rem 0;`;
const Price = styled.p`color:${props => props.theme.primary};font-weight:bold;margin:0`;

const Button = styled.button`
  margin-top: .5rem;
  padding: .4rem .8rem;
  border: none;
  background: ${props => props.theme.primary};
  color: white;
  cursor: pointer;
  border-radius: 4px;
  &:hover{background:${props => props.theme.accent};}
`;

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration:'none', color:'${props => props.theme.secondary}' }}>
      <Card>
        <Img src={product.image} alt={product.title}/>
        <Title>{product.title}</Title>
        <Price>R$ {Number(product.price).toFixed(2)}</Price>

        <Button
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </Button>
      </Card>
    </Link>
  );
}