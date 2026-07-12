import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export default function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    apiGet('/products')
      .then(setData)
      .catch(setError)
      .finally(()=>setLoading(false));
  }, []);

  return { data, loading, error };
}
