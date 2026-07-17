import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  useEffect(() => {
    apiGet('/products/categories')
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}