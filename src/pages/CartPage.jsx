import styled from 'styled-components';
import useCart from '../hooks/useCart';
import { useState } from 'react';
import Footer from '../components/Footer';
import ConfirmModal from '../components/ConfirmModal';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';

const Container = styled.div`
  padding:2rem;
`;

const Logo = styled.div`
  display:flex;
  flex-wrap: wrap;
  align-items:center;
  text-decoration:none;
  color:${props => props.theme.text};
  gap: 1rem;
  justify-content: center;

  h2 {
    text-align: center;
  }
`;

const Table = styled.table`
  width:100%;
  border-collapse:collapse;
  margin-top:1rem;

  @media (max-width:700px) {
    display:block;
    overflow-x:auto;
  }
`;

const Img = styled.img`
  max-width:50px; object-fit:contain;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.primary};
  }
`;

const Th = styled.th`border-bottom:1px solid ${props => props.theme.secondary}; border-top:1px solid ${props => props.theme.secondary}; text-align:center; padding:.5rem;`;
const Td = styled.td`border-bottom:1px solid ${props => props.theme.secondary}; padding:.5rem; text-align:center; max-width:200px; min-width:100px;`;

const ButtonQtd = styled.button`
  padding: .2rem .4rem;
  margin: .3rem;
  border: none;
  background: ${props => props.theme.foreground};
  color: ${props => props.theme.text};
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonRemover = styled.button`
  padding: .4rem .8rem;
  margin: .3rem;
  border: none;
  background: #e53e3e;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
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

export default function CartPage() {
  const { items, total, removeItem, updateQty, clearCart} = useCart();
  const [showClearModal, setShowClearModal] = useState(false);

  if (items.length === 0) return (
    <Wrapper>
      <Content>
        <Container>
          <Logo>
            <FaShoppingCart size={24} />
            <h2>Carrinho de Compras</h2>
          </Logo>

          <div style={{ display: 'flex', justifyContent: 'center',  textAlign: 'center'}}>
            <p style={{ padding: '2rem' }}>Seu carrinho está vazio.</p>
          </div>    
        </Container>
      </Content>
      <Footer />
    </Wrapper>
  );

  /* ---------- Helpers de incremento/decremento ---------- */
  const increment = (id, currentQty) => updateQty(id, currentQty + 1);
  const decrement = (id, currentQty) =>
    currentQty > 1 ? updateQty(id, currentQty - 1) : removeItem(id); // se chegar a 0 → remove

  return (
    <Wrapper>
      <Content>
        <Container>
          <Logo>
            <FaShoppingCart size={24} />
            <h2>Carrinho de Compras</h2>
          </Logo>    

          <Table>
            <thead>
              <tr>
                <Th colSpan={2}>Produto</Th>
                <Th>Preço</Th>
                <Th>Qtd.</Th>
                <Th>Total</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <Td><Img src={i.image} alt={i.title}/></Td>
                  <Td><ProductLink to={`/product/${i.id}`}>{i.title}</ProductLink></Td>
                  <Td>R$ {Number(i.price).toFixed(2)}</Td>

                  {/* Botões + / – */}
                  <Td>
                    <ButtonQtd
                      onClick={() => decrement(i.id, i.quantity)}>–</ButtonQtd>

                    <span>{i.quantity}</span>

                    <ButtonQtd
                      onClick={() => increment(i.id, i.quantity)}>+</ButtonQtd>
                  </Td>

                  <Td>R$ {(i.price * i.quantity).toFixed(2)}</Td>
                  <Td>
                    <ButtonRemover
                      onClick={() => removeItem(i.id)}>
                      Remover Item
                    </ButtonRemover>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h3 style={{ marginTop: '1.5rem' }}>
            Total: R$ {total.toFixed(2)}
          </h3>

          <ButtonRemover
            onClick={() => setShowClearModal(true)}>
            Limpar Carrinho
          </ButtonRemover>

          {/* Modal de confirmação */}
          {showClearModal && (
            <ConfirmModal
              title="Tem certeza que deseja limpar o carrinho?"
              onConfirm={() => {
                clearCart();
                setShowClearModal(false);
              }}
              onCancel={() => setShowClearModal(false)}
            />
          )}        

        </Container>
        
      </Content>
      <Footer />
    </Wrapper>
    
  );
}