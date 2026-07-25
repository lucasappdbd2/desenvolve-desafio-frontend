import styled from 'styled-components';
import useCart from '../hooks/useCart';
import { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding:2rem;
`;

const Logo = styled.div`
  display:flex;
  align-items:center;
  text-decoration:none;
  color:#333;
  gap: 1rem;
`;

const Table = styled.table`
  width:100%;
  border-collapse:collapse;
  margin-top:1rem;
`;

const Img = styled.img`
  max-width:50px; object-fit:contain;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
    color: #805ad5;
  }
`;

const Th = styled.th`border-bottom:1px solid #e2e8f0; text-align:center; padding:.5rem;`;
const Td = styled.td`padding:.5rem; text-align:center; max-width:200px; min-width:100px;`;


export default function CartPage() {
  const { items, total, removeItem, updateQty, clearCart} = useCart();
  const [showClearModal, setShowClearModal] = useState(false);

  if (items.length === 0) return (
    <Container>
      <Logo>
        <FaShoppingCart size={24} />
        <h2>Carrinho de Compras</h2>
      </Logo>
      
      Seu carrinho está vazio.</Container>);

  /* ---------- Helpers de incremento/decremento ---------- */
  const increment = (id, currentQty) => updateQty(id, currentQty + 1);
  const decrement = (id, currentQty) =>
    currentQty > 1 ? updateQty(id, currentQty - 1) : removeItem(id); // se chegar a 0 → remove

  return (
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
                <button
                  onClick={() => decrement(i.id, i.quantity)}
                  style={{
                    padding: '.2rem .4rem',
                    marginRight: '.3rem',
                    border: 'none',
                    background: '#e53e3e',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '1.2rem'
                  }}
                >–</button>

                <span>{i.quantity}</span>

                <button
                  onClick={() => increment(i.id, i.quantity)}
                  style={{
                    padding: '.2rem .4rem',
                    marginLeft: '.3rem',
                    border: 'none',
                    background: '#38a169',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '1.2rem'
                  }}
                >+</button>
              </Td>

              <Td>R$ {(i.price * i.quantity).toFixed(2)}</Td>
              <Td>
                <button
                  onClick={() => removeItem(i.id)}
                  style={{
                    border: 'none',
                    background: '#718096',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '.4rem .8rem',
                    borderRadius: '4px',
                  }}
                >
                  Remover
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 style={{ marginTop: '1.5rem' }}>
        Total: R$ {total.toFixed(2)}
      </h3>

      <button
        onClick={() => setShowClearModal(true)}
        style={{
          marginTop: '.8rem',
          border: 'none',
          background: '#718096',
          color: 'white',
          cursor: 'pointer',
          padding: '.6rem 1.2rem',
          borderRadius: '4px',
        }}
      >
        Limpar carrinho
      </button>

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
  );
}