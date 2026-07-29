import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import useProduct from '../hooks/useProduct';
import useCart from '../hooks/useCart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem;
  gap: 1rem;
  max-width: 600px;

  h2 {
    color: ${props => props.theme.primary};
    text-align: center;
  }
`;
const Img = styled.img`
  max-width:400px; width:100%; object-fit:contain;
  max-height: 300px;
`;

const Price = styled.h3`
  color:${props => props.theme.primary};
  font-weight:bold;
  font-size: 2rem;
  margin:0;
`;

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

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-height:calc(100vh - 5.5rem);

  @media (max-width: 680px) {
    min-height:calc(100vh - 8.0rem);
  }
`;

const Content = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
`;

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };  

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
      <Content>
        <Container>
          <h2>{product.title}</h2>
          <Img src={product.image} alt={product.title}/>
          
          <p style={{ textAlign: 'justify' }}>{product.description}</p>

          <Price>R$ {Number(product.price).toFixed(2)}</Price>
          <Button
            onClick={handleAddToCart}
          >
          Adicionar ao Carrinho
          </Button>

        </Container>
      </Content>
      <Footer />
    </Wrapper>
  );
}