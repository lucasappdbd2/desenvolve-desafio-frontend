import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {}
});

const STORAGE_TOKEN_KEY   = 'access_token';
const STORAGE_USER_KEY    = 'current_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(STORAGE_TOKEN_KEY)
  );
  const [user, setUser]   = useState(null);

  // Persistência na inicialização: Se existir token, tenta restaurar o usuário guardado (o token não expira).
  useEffect(() => {
    if (!token) return;
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [token]);

  // Login de usuário
  const login = async ({ email, password }) => {
    try {
      // Busca a lista de usuários
      const resUsers = await fetch('https://fakestoreapi.com/users');
      if (!resUsers.ok) throw new Error(`API error ${resUsers.status}`);
      const users = await resUsers.json();   // [{id, email, password, username, etc}]

      // Verifica se o par email/senha informados constam no array de usuários
      const matchedUser = users.find(
        u => u.email === email && u.password === password
      );

      if (!matchedUser) return false; // Se o par email/senha não constar no array: Login falhou

      /* ------------------------------------------------------------- */
      /* Se constar no array, gera um token real com /auth/login */
      /* ------------------------------------------------------------- */
      const authResp = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: matchedUser.username,  // Campo que a API espera
          password,
        })
      });

      if (!authResp.ok) throw new Error(`Auth error ${authResp.status}`);
      const authData = await authResp.json();
      const realToken = authData.token;     // token gerado pela API

      /* ------------------------------------------------------------- */
      /* Persistência de dados no localStorage (token + usuário)                         */
      /* ------------------------------------------------------------- */
      localStorage.setItem(STORAGE_TOKEN_KEY, realToken);
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(matchedUser));

      setToken(realToken);   // Salva o token no localStorage
      setUser(matchedUser);  // Salva o usuário no localStorage

      return true;           // Login efetuado com sucesso
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  // Logout: Limpa as informações e estado do localStorage
  const logout = () => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!token && !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}