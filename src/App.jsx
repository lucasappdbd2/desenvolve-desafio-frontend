import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import GlobalStyle from './styles/GlobalStyle';

import { CartProvider } from './hooks/CartContext';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <GlobalStyle />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

      </CartProvider>
    </Router>
  );
}