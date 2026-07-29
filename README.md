# Projeto Desenvolve - Bom Despacho
## Desafio Frontend - Catálogo de Produtos
### Matrícula: PDBD109
---

## 🛒 Tema: Portal de Compras

Este é um projeto em *React* que utiliza *Styled Components* e consumo de API através da plataforma *FakeStoreAPI*.

Siga os passos abaixo para configurar e executar o projeto localmente.

### ✅ Pré-requisitos

- **Node.js** - versão 24.16.0 ou superior
- **npm** - versão 11.13.0 ou superior
- **Git**

### 🚀 Como executar o projeto localmente

1. **Clone este repositório**
   ```bash
   git clone https://github.com/lucasappdbd2/desenvolve-desafio-frontend.git
   ```
2. **Acesse o diretório do projeto**
   ```bash
   cd desenvolve-desafio-frontend
   ```
3. **Instale as dependências**
   ```bash
   npm install
   ```
4. **Execute a aplicação**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em:
   ```
   http://localhost:5173/
   ```
---

### ⚙️ Tecnologias Utilizadas

- **React** – Biblioteca de UI que permite criar componentes reativos e usar *hooks* (`useState`, `useEffect`, `useContext`).
- **Vite** – Ferramenta de build moderna, com *hot‑reload* rápido e bundle otimizado.
- **Styled‑Components** – Estilização em CSS‑in‑JS; facilita a criação de temas dinâmicos (*light / dark*).
- **React Router** – Gerenciador de navegação: rotas `/`, `/product/:id`, `/cart` e `/login`.
- **Fetch API** – Consumo assíncrono da *FakeStoreAPI* (`/products`, `/products/:id`, `/products/categories`).
- **Context API + useReducer** – Estado global para o carrinho (*add, remove, update qty, total*).
- **localStorage** – Persistência de carrinho e tema entre recarregamentos.
- **Dark‑mode toggle** – Botão que alterna entre tema claro e escuro usando *Styled‑Components*.
- **Debounce search** – Busca em tempo real com atraso de 300 ms para evitar chamadas excessivas à API.

---

### 🗂️ Estrutura de Pastas
- `src/components` – UI reutilizáveis (*Header, Footer, ProductCard*, etc);
- `src/hooks` – hooks customizados (`useProducts`, `useCart`, etc.);
- `src/pages` – páginas: *Home, ProductDetail, Cart, Login*;
- `src/services` – API (`api.js`);
- `src/styles` – `GlobalStyle`.

---

### 📋 Lista de Funcionalidades

- 📦 **Listagem de Produtos**
  - Exibe todos os produtos em um grid responsivo.
  - Cada card mostra imagem, título e preço formatado (R$).

- 🗂️ **Filtragem por Categoria**
  - Menu que permite selecionar categoria (`electronics`, `jewelery`, etc).

- 🔎 **Busca em Tempo Real**  
  - Campo de busca com debounce de 300 ms para filtrar produtos por título.

- 📄 **Detalhes do Produto**
  - Página `/product/:id` mostra imagem, descrição completa e preço.
  - Botão “Adicionar ao Carrinho”.

- 🛒 **Carrinho de Compras (CRUD local)**
  - Adicionar item, ou incrementar quantidade se o item já estiver no carrinho.  
  - Remover item ou limpar o carrinho completamente.  
  - Cálculo instantâneo do valor total.
  - Persistência em `localStorage`.

- 🔐 **Autenticação**  
  - Login com email/senha via *FakeStoreAPI*.  
  - Logout que limpa token, usuário e carrinho do `localStorage`.

- 🎛️ **Tema Escuro / Claro**
  - Botão que altera entre os temas `light` e `dark`, e salva a preferência no `localStorage`.

- ⏳ **Mensagens de Carregamento e de Erro**
  - Texto “Carregando…” enquanto busca dados.  
  - Mensagem de erro caso a API falhe.

- 📚 **Arquitetura Limpa**
  - Código reutilizável e organizado em subpastas.