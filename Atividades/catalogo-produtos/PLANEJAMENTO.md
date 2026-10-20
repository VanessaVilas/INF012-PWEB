# Planejamento — Catálogo de Produtos (Prova React JS)

Este documento descreve **como** o projeto da prova será construído e **qual arquitetura de pastas** será usada.
Nenhum código foi alterado ainda: este é apenas o plano.

- **Escopo:** apenas o que o PDF pede (Questões 1 a 6). Nenhuma funcionalidade extra.
- **Base de arquitetura:** projeto `filmaria`, usado só como referência (ele não será modificado).
- **Destino:** `INF012-PWEB/Atividades/catalogo-produtos/`

---

## 1. Arquitetura de referência (filmaria)

```
filmaria/src/
├── api/index.jsx            → instância do Axios (baseURL)
├── components/Header/       → componente de navegação com <Link>
├── pages/Home/              → listagem (useState + useEffect + api.get)
├── pages/Filme/             → detalhes (useParams + loading)
├── pages/Favoritos/         → lista com ação de excluir + filter no estado
├── routes/index.jsx         → BrowserRouter + Header + <Routes>
└── main.jsx                 → renderiza <Rotas/>
```

Padrões do filmaria que serão mantidos:

| Padrão do filmaria | Como será aplicado no catálogo |
|---|---|
| Uma pasta por componente/página com `index.jsx` | `pages/ListaProdutos/index.jsx`, `components/Menu/index.jsx` etc. |
| `api/index.jsx` com `axios.create({ baseURL })` | `baseURL: "http://localhost:8080"` |
| `routes/index.jsx` com `BrowserRouter`, componente de navegação fixo e `<Routes>` | Mesmo formato, com `Menu` no lugar de `Header` |
| `main.jsx` renderiza o componente de rotas direto | `main.jsx` renderiza `<CatalogoProdutos/>` |
| `export default function Nome()` | Mantido nos componentes funcionais |
| `useEffect` + `async function load...()` + `setX(response.data)` | Mantido na listagem |
| Exclusão atualizando o estado com `filter` (Favoritos) | Usado na exclusão de produtos (Questão 6f) |
| `<Link to={`/filme/${item.id}`}>` | `<Link to={`/produtos/${produto.id}`}>` |

Diferenças necessárias, porque a prova pede:
- **Sem arquivos CSS** (a prova diz que CSS não é necessário).
- **Mensagens renderizadas no JSX via estado** (carregando, erro, sucesso), em vez de `react-toastify`, porque a prova pede "exibir uma mensagem" e tratamento de erros com `try/catch`.
- **`DetalhesProduto` será componente de classe** (Questão 2), diferente do `Filme` do filmaria.

---

## 2. Estado atual da pasta `catalogo-produtos`

O projeto já foi criado com Vite e já tem `axios`, `react-router-dom` e `react-toastify` no `package.json`. Pontos encontrados:

- `src/App.jsx` ainda é o template padrão do Vite e importa `./assets/hero.png`, `./assets/react.svg`, `./assets/vite.svg` e `./App.css`, que **não existem**.
- `src/main.jsx` importa `./index.css`, que **também não existe**.
- Já existe `src/services/api.js` com a instância do Axios apontando para `http://localhost:8080`.
- `node_modules` ainda não foi instalado.

Resultado: hoje o projeto não roda. Na implementação, esses restos do template serão removidos.

---

## 3. Arquitetura de pastas proposta

```
catalogo-produtos/
├── index.html
├── package.json
├── vite.config.js
├── PLANEJAMENTO.md                 ← este documento
├── RESPOSTAS.md                    ← respostas teóricas (Q2, Q4b, Q4c, Q5a, Q5c, Q5d)
└── src/
    ├── main.jsx                    ← renderiza <CatalogoProdutos/>
    ├── api/
    │   └── index.jsx               ← axios.create({ baseURL: "http://localhost:8080" })
    ├── components/
    │   ├── Menu/
    │   │   └── index.jsx           ← Questão 6a
    │   └── Contador/
    │       └── index.jsx           ← Questão 5b (não entra nas rotas)
    ├── pages/
    │   ├── ListaProdutos/
    │   │   └── index.jsx           ← Questões 1, 5d, 6c, 6d, 6e, 6f
    │   ├── CadastroProduto/
    │   │   └── index.jsx           ← Questão 3
    │   └── DetalhesProduto/
    │       └── index.jsx           ← Questão 2 (componente de classe)
    └── routes/
        └── index.jsx               ← Questões 4a e 6b (CatalogoProdutos)
```

Mudanças em relação ao que existe hoje:

| Arquivo | Ação |
|---|---|
| `src/services/api.js` | Movido para `src/api/index.jsx` (mesma configuração), seguindo o filmaria |
| `src/App.jsx` | Removido (template do Vite; substituído por `routes/index.jsx`) |
| `src/main.jsx` | Reescrito: remove `import './index.css'` e renderiza `<CatalogoProdutos/>` |
| Demais arquivos (`package.json`, `vite.config.js`, `index.html`) | Sem alteração |

---

## 4. Mapa: questão → arquivo

| Questão | Pede | Onde fica |
|---|---|---|
| **Q1** a–e | `ListaProdutos` funcional: GET `/api/produtos`, estado, nome/preço/categoria, mensagem de carregamento, tratamento de erro | `pages/ListaProdutos/index.jsx` |
| **Q2** a–d | `DetalhesProduto` de classe: prop `id`, `componentDidMount`, estado, nome/preço/estoque, mensagem de "não encontrado"/erro | `pages/DetalhesProduto/index.jsx` |
| **Q2** explicação | Função do método de ciclo de vida | `RESPOSTAS.md` |
| **Q3** a–e | `CadastroProduto` funcional: formulário, `preventDefault`, POST, mensagem de sucesso/erro, limpar campos | `pages/CadastroProduto/index.jsx` |
| **Q4a** | Rotas `/produtos`, `/produtos/novo`, `/produtos/:id` | `routes/index.jsx` |
| **Q4b, Q4c** | Como o `id` é identificado; `Link` × `<a>` | `RESPOSTAS.md` |
| **Q5a, Q5c** | Por que a variável não re-renderiza; finalidade do `useState` | `RESPOSTAS.md` |
| **Q5b** | `Contador` reescrito com `useState` | `components/Contador/index.jsx` |
| **Q5d** | Finalidade do `useEffect` + exemplo buscando produtos | `RESPOSTAS.md` (aponta para o `useEffect` de `ListaProdutos`) |
| **Q6a** | `Menu` com links para listagem e cadastro | `components/Menu/index.jsx` |
| **Q6b** | React Router controlando a navegação (`CatalogoProdutos`) | `routes/index.jsx` |
| **Q6c, Q6d** | Lista da API + link para detalhes pelo ID | `pages/ListaProdutos/index.jsx` |
| **Q6e, Q6f** | Excluir com DELETE e atualizar a lista sem recarregar | `pages/ListaProdutos/index.jsx` |

---

## 5. Detalhamento de cada arquivo

### 5.1 `src/api/index.jsx`
Mesma ideia do filmaria: uma instância única do Axios, importada por todos os componentes.
```js
const api = axios.create({ baseURL: "http://localhost:8080" });
export default api;
```
Os endpoints ficam nos componentes: `api.get('/api/produtos')`, `api.get('/api/produtos/' + id)`, `api.post('/api/produtos', dados)`, `api.delete('/api/produtos/' + id)`.

> O `PUT /api/produtos/10` aparece na tabela do enunciado, mas **nenhuma questão pede edição**, então ele não será implementado.

### 5.2 `pages/ListaProdutos/index.jsx` (Q1 + Q6)
Componente funcional, no padrão da `Home` + `Favoritos` do filmaria.
- Estados: `produtos` (array), `loading` (boolean), `erro` (string).
- `useEffect(() => { ... }, [])` com `async function loadProdutos()` e `try/catch/finally`:
  - `try`: `api.get('/api/produtos')` → `setProdutos(response.data)`
  - `catch`: `setErro('Não foi possível carregar os produtos. A API está indisponível.')`
  - `finally`: `setLoading(false)`
- Renderização:
  - `loading` → "Carregando produtos..."
  - `erro` → mensagem de erro
  - senão → `produtos.map(...)` mostrando **nome, preço e categoria**, um `<Link to={`/produtos/${produto.id}`}>` (Q6d) e um botão **Excluir** (Q6e).
- `excluirProduto(id)` (Q6e/Q6f):
  - `await api.delete('/api/produtos/' + id)`
  - se der certo: `setProdutos(produtos.filter(p => p.id !== id))` → a lista atualiza na hora, sem recarregar a página (mesma técnica de `excluirFilmes` no filmaria)
  - se falhar: mensagem de erro.

### 5.3 `pages/DetalhesProduto/index.jsx` (Q2)
**Componente de classe** (`class DetalhesProduto extends Component`).
- `state = { produto: null, loading: true, erro: '' }`
- `componentDidMount()` faz `api.get('/api/produtos/' + this.props.id)`:
  - sucesso → `this.setState({ produto: response.data, loading: false })`
  - erro 404 → "Produto não encontrado."
  - outro erro → "Erro ao buscar o produto."
- `render()` mostra **nome, preço e estoque**, ou a mensagem correspondente.

**Ligação com a rota `/produtos/:id`:** a prova diz que o componente "recebe a propriedade `id`". Componentes de classe não podem usar o hook `useParams`, então o arquivo também exporta, como `default`, um pequeno componente funcional que lê o parâmetro da URL e repassa como prop:
```jsx
export default function DetalhesProdutoRota() {
  const { id } = useParams();
  return <DetalhesProduto id={id} />;
}
```
Isso não é funcionalidade nova; é só a ligação necessária entre a Q2 (prop `id`) e a Q4 (`/produtos/:id`). Também será explicado em `RESPOSTAS.md` (Q4b).

### 5.4 `pages/CadastroProduto/index.jsx` (Q3)
Componente funcional com formulário controlado.
- Estados: `nome`, `preco`, `categoria`, `estoque`, `mensagem`.
- Inputs com `value={...}` e `onChange={(e) => setX(e.target.value)}` (Q3a).
- `async function handleSubmit(e)`:
  1. `e.preventDefault()` (Q3b)
  2. `await api.post('/api/produtos', { nome, preco: Number(preco), categoria, estoque: Number(estoque) })` (Q3c), convertendo para número para seguir o JSON de exemplo da API
  3. sucesso → `setMensagem('Produto cadastrado com sucesso!')` e limpa os quatro campos (Q3d, Q3e)
  4. erro → `setMensagem('Erro ao cadastrar o produto.')` (Q3d)

### 5.5 `components/Menu/index.jsx` (Q6a)
Mesmo formato do `Header` do filmaria, sem CSS:
```jsx
<nav>
  <Link to="/produtos">Produtos</Link>
  <Link to="/produtos/novo">Cadastrar produto</Link>
</nav>
```

### 5.6 `components/Contador/index.jsx` (Q5b)
O `Contador` do enunciado reescrito com `const [quantidade, setQuantidade] = useState(0)` e `setQuantidade(quantidade + 1)` no clique.
Ele **não ganha rota**, porque a prova só define três páginas; fica no projeto como resposta da Q5b.

### 5.7 `routes/index.jsx` → `CatalogoProdutos` (Q4a + Q6b)
Mesma estrutura do `Rotas` do filmaria, mas com o nome pedido na Q6:
```jsx
export default function CatalogoProdutos() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/produtos" element={<ListaProdutos />} />
        <Route path="/produtos/novo" element={<CadastroProduto />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />
      </Routes>
    </BrowserRouter>
  );
}
```
- O React Router v6+/v7 dá prioridade a rotas estáticas, então `/produtos/novo` não é confundida com `/produtos/:id`.
- A raiz `/` **não terá rota**, porque o PDF não define uma. A navegação começa pelo `Menu`.

### 5.8 `main.jsx`
```jsx
import CatalogoProdutos from './routes';
createRoot(document.getElementById('root')).render(
  <StrictMode><CatalogoProdutos /></StrictMode>
);
```

### 5.9 `RESPOSTAS.md`
Respostas teóricas, uma seção por questão:
- **Q2:** papel do `componentDidMount` (executa uma vez, logo após o componente ser montado no DOM; é o lugar certo para requisições iniciais).
- **Q4b:** o `:id` na rota vira parâmetro; o React Router o expõe via `useParams()`, e o wrapper repassa como prop para a classe.
- **Q4c:** `<Link>` troca a rota pelo History API sem recarregar a página (SPA, estado preservado); `<a>` faz uma nova requisição ao servidor e recarrega toda a aplicação.
- **Q5a:** `quantidade` é uma variável local recriada a cada execução da função, e alterá-la não avisa o React para renderizar de novo.
- **Q5c:** `useState` guarda um valor entre renderizações e, quando o setter é chamado, agenda uma nova renderização.
- **Q5d:** `useEffect` executa efeitos colaterais após a renderização; com `[]` roda só na montagem. Exemplo: o `useEffect` de `ListaProdutos`.

---

## 6. Ordem de execução

1. **Limpar o template:** remover `src/App.jsx`, tirar `import './index.css'` do `main.jsx`, mover `src/services/api.js` → `src/api/index.jsx`.
2. Criar `src/api/index.jsx`.
3. Criar `components/Menu`.
4. Criar `pages/ListaProdutos` (Q1 + Q6).
5. Criar `pages/DetalhesProduto` (Q2).
6. Criar `pages/CadastroProduto` (Q3).
7. Criar `components/Contador` (Q5b).
8. Criar `routes/index.jsx` (`CatalogoProdutos`) e atualizar `main.jsx`.
9. Escrever `RESPOSTAS.md`.
10. **Validar:** `npm install`, `npm run lint` e `npm run build`. Com o backend em `http://localhost:8080` rodando, testar no `npm run dev`: listar, ver detalhes, cadastrar e excluir. Sem backend, as telas devem mostrar as mensagens de erro.

---

## 7. O que **não** será feito (fora do escopo do PDF)

- CSS ou estilização.
- Edição de produto (PUT): o endpoint existe, mas nenhuma questão pede.
- Rota `/`, página 404, favoritos, `localStorage`, toasts.
- Backend ou mock da API: a prova diz para considerar a API disponível em `localhost:8080`.
- Qualquer alteração no projeto `filmaria`.

---

## 8. Ponto para confirmar antes de implementar

Hoje o `catalogo-produtos` usa `src/services/api.js`. O plano move o arquivo para `src/api/index.jsx` para seguir o filmaria. Se preferir manter `services/api.js`, só muda o caminho dos imports; o restante do plano continua igual.
