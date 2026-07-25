import { useContext, useState } from 'react';
import { CartContext } from './CartContext';

export default function useCart() {
  const ctx = useContext(CartContext);

  return {
    items: ctx.items,
    total: ctx.total,

    addItem: ctx.addItem,
    removeItem: ctx.removeItem,
    updateQty: ctx.updateQty,
    clearCart: ctx.clearCart
  };
}
