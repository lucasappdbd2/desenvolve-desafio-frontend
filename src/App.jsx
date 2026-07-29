import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import GlobalStyle from './styles/GlobalStyle';
import LoginPage from './pages/LoginPage';

import { CartProvider } from './hooks/CartContext';
import { SearchProvider } from './hooks/SearchContext';
import { AuthProvider } from './hooks/AuthContext';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, ThemeContext } from './hooks/ThemeContext';
import { light, dark } from './hooks/ThemeContext';

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <AuthProvider>
          <CartProvider>

            {/* Contexto de tema (mantém “light/dark”) */}
            <ThemeProvider>

              {/* styled‑components ThemeProvider recebe a paleta de cores atual */}
              <ThemeContext.Consumer>
                {({ theme }) => (
                  <StyledThemeProvider theme={theme === 'light' ? light : dark}>
                    <GlobalStyle />

                    <Header />

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/login" element={<LoginPage />} />
                    </Routes>
                  </StyledThemeProvider>
                )}
              </ThemeContext.Consumer>

            </ThemeProvider>

          </CartProvider>
        </AuthProvider>
      </SearchProvider>
    </Router>
  );
}