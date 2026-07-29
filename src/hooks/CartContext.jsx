import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const CART_STORAGE_KEY = 'carrinho';
const initialState = { items: [], total: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload;

    case 'ADD_ITEM': {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      let newItems;

      if (existing) {
        newItems = state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }

      const newTotal = newItems.reduce(
        (s, i) => s + i.price * i.quantity,
        0
      );

      return { items: newItems, total: newTotal };
    }

    case 'REMOVE_ITEM': {
      const id = action.payload;
      const newItems = state.items.filter(i => i.id !== id);
      const newTotal = newItems.reduce(
        (s, i) => s + i.price * i.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newItems = state.items
        .map(i => (i.id === id ? { ...i, quantity } : i))
        .filter(i => i.quantity > 0);

      const newTotal = newItems.reduce(
        (s, i) => s + i.price * i.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Funções de manipulação
  const addItem   = product => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem= id     => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // Persistência em localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: 'INIT', payload: JSON.parse(saved) });
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Valores do Context Provider
  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};