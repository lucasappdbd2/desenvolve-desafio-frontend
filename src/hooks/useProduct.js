import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!id) return;
    apiGet(`/products/${id}`)
      .then(setProduct)
      .catch(setError)
      .finally(()=>setLoading(false));
  }, [id]);

  return { product, loading, error };
}