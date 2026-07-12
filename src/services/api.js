export const apiGet = async (endpoint) => {
  const res = await fetch(`https://fakestoreapi.com${endpoint}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
};
