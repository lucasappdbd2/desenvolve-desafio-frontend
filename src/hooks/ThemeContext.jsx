import { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

/* ---------- Paletas ----------
  light  – cores claras (default)
  dark   – cores escuras */
export const light = {
  background: '#ffffff',
  foreground: '#f5f6fa',
  text: '#333333',
  primary: '#805ad5',
  secondary: '#e2e8f0',
  accent: '#cd87e9',
};

export const dark = {
  background: '#1a202c',
  foreground: '#2d3748',
  text: '#f7fafc',
  primary: '#cd87e9',
  secondary: '#4a5568',
  accent: '#805ad5',
};

/* ---------- Contexto ----------
   Mantém “light/dark” + toggle */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const STORAGE_KEY = 'app-theme';

export function ThemeProvider({ children }) {
  /* --- Estado local ---
     - `theme`      : valor atual ('light' | 'dark')
     - `systemPref` : true se o tema está sendo buscado a preferência do dispositivo
   */
  const [theme, setTheme] = useState('light');
  const [systemPref, setSystemPref] = useState(false);

  /* ----------- Inicialização ----------
    carrega tema salvo (se existir),
    ou então usa a preferência do dispositivo */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTheme(saved);
      return;
    }

    // sem valor salvo: usa a preferência do dispositivo
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const initPref = mql.matches ? 'dark' : 'light';
    setTheme(initPref);
    setSystemPref(true);   // indica que está seguindo a preferência do dispositivo
  }, []);

  /* ----------- Toggle ----------
    troca de tema;
    salva em localStorage;
    desabilita “systemPref” */
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    setSystemPref(false);   // tema escolhido pelo usuário
  };

  /* ----------- Responder a mudanças do sistema ----------
     Se ainda não houver escolha manual, atualiza quando a preferência do dispositivo mudar */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = e => {
      if (!systemPref) return;            // se ainda não houver escolha manual
      setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [systemPref]);

  /* Seleciona a paleta de cores com base no tema atual */
  const currentPalette = theme === 'light' ? light : dark;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* styled‑components ThemeProvider recebe a paleta de cores */}
      <StyledThemeProvider theme={currentPalette}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}