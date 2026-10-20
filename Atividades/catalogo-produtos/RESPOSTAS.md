# Respostas teóricas — Prova de Programação Web (React JS)

As respostas em código estão nos arquivos de `src/`. Aqui ficam as explicações pedidas no enunciado.

| Questão | Código |
|---|---|
| Q1 | `src/pages/ListaProdutos/index.jsx` |
| Q2 | `src/pages/DetalhesProduto/index.jsx` |
| Q3 | `src/pages/CadastroProduto/index.jsx` |
| Q4a | `src/routes/index.jsx` |
| Q5b | `src/components/Contador/index.jsx` |
| Q6 | `src/routes/index.jsx` (`CatalogoProdutos`), `src/components/Menu/index.jsx`, `src/pages/ListaProdutos/index.jsx` |

---

## Questão 2 — Método de ciclo de vida

O método usado é o **`componentDidMount()`**.

Ele é executado **uma única vez**, logo depois que o componente é montado, ou seja, quando ele já foi renderizado e inserido no DOM. Por isso é o lugar adequado para efeitos colaterais iniciais, como requisições HTTP. Em `DetalhesProduto`, ele chama `api.get('/api/produtos/' + this.props.id)`. Quando a resposta chega, o `this.setState(...)` guarda o produto no estado, e o React chama `render()` de novo para exibir os dados. Se a requisição falha, o mesmo método guarda uma mensagem de erro no estado: "Produto não encontrado." para status 404 e "Erro ao buscar o produto." para os demais erros.

Não se deve fazer a requisição no `render()`, porque ele roda a cada atualização e criaria um ciclo de requisições.

---

## Questão 4

### a) Configuração das rotas

```jsx
<BrowserRouter>
    <Menu />
    <Routes>
        <Route path="/produtos" element={<ListaProdutos />} />
        <Route path="/produtos/novo" element={<CadastroProduto />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />
    </Routes>
</BrowserRouter>
```

O React Router dá prioridade a rotas estáticas sobre rotas com parâmetro. Por isso `/produtos/novo` abre o cadastro e não é tratado como `/produtos/:id` com `id = "novo"`.

### b) Como a aplicação identifica o parâmetro `id`

Os dois-pontos em `/produtos/:id` dizem ao React Router que esse trecho da URL é **dinâmico**. Ao acessar `/produtos/10`, o roteador compara a URL com o padrão e associa `id = "10"`.

O valor é lido com o hook **`useParams()`**:

```jsx
const { id } = useParams(); // "10"
```

Como `DetalhesProduto` é um componente de classe e classes não podem usar hooks, o arquivo exporta um pequeno componente funcional (`DetalhesProdutoRota`). Ele lê o `id` com `useParams()` e o repassa como prop: `<DetalhesProduto id={id} />`. Dentro da classe, o valor é acessado por `this.props.id`.

### c) `<Link>` do React Router × tag `<a>` convencional

- **`<Link to="...">`**: a navegação acontece **no próprio navegador**, sem recarregar a página. O React Router atualiza a URL pela History API e renderiza só o componente da nova rota. A aplicação continua carregada, o estado dos componentes que permanecem na tela é mantido (por exemplo, o `Menu`) e nenhum novo HTML é pedido ao servidor. Esse é o comportamento de uma SPA (Single Page Application).
- **`<a href="...">`**: o navegador faz uma **nova requisição ao servidor** e **recarrega a página inteira**. Toda a aplicação React é reiniciada: o estado se perde, os scripts são baixados e executados de novo e a navegação fica mais lenta.

---

## Questão 5

### a) Por que alterar `quantidade` não renderiza de novo

`quantidade` é uma **variável local comum** da função `Contador`. Duas coisas acontecem:

1. O React **não tem como saber** que a variável mudou. Atribuir um novo valor a uma variável JavaScript não avisa o React para renderizar o componente de novo. O `console.log` mostra o valor aumentando, mas a tela não muda.
2. Mesmo que o componente fosse renderizado de novo por outro motivo, a função `Contador` seria executada outra vez e `let quantidade = 0` **reiniciaria o valor**. Variáveis locais não são guardadas entre renderizações.

### b) Componente reescrito com `useState`

Ver `src/components/Contador/index.jsx`:

```jsx
import { useState } from "react";

function Contador() {
    const [quantidade, setQuantidade] = useState(0);

    function incrementar() {
        setQuantidade(quantidade + 1);
        console.log(quantidade + 1);
    }

    return (
        <div>
            <p>Quantidade: {quantidade}</p>
            <button onClick={incrementar}>
                Incrementar
            </button>
        </div>
    );
}

export default Contador;
```

### c) Finalidade do `useState`

O `useState` cria uma **variável de estado** em um componente funcional. Ele retorna um par `[valor, funçãoQueAtualiza]`:

- o **valor** é guardado pelo React entre renderizações, então não volta ao valor inicial;
- ao chamar a **função de atualização** (`setQuantidade`), o React guarda o novo valor e **renderiza o componente de novo**, atualizando a tela.

### d) Finalidade do `useEffect` e exemplo

O `useEffect` executa **efeitos colaterais** depois da renderização do componente: requisições HTTP, timers, inscrições em eventos, acesso ao `localStorage` etc. O segundo argumento, a lista de dependências, controla quando ele roda:

- `[]`: roda **uma vez**, quando o componente é montado (equivale ao `componentDidMount`);
- `[x]`: roda na montagem e sempre que `x` mudar;
- sem lista: roda depois de toda renderização.

Exemplo buscando os produtos na montagem (usado em `src/pages/ListaProdutos/index.jsx`):

```jsx
useEffect(() => {
    async function loadProdutos() {
        try {
            const response = await api.get("/api/produtos");
            setProdutos(response.data);
        } catch {
            setErro("Não foi possível carregar os produtos. A API está indisponível.");
        } finally {
            setLoading(false);
        }
    }
    loadProdutos();
}, []);
```

---

## Questão 6 — Como os componentes se integram

- **`main.jsx`** renderiza `CatalogoProdutos`.
- **`CatalogoProdutos`** (`src/routes/index.jsx`) tem o `BrowserRouter`, o `Menu` fixo no topo e as três rotas (6b).
- **`Menu`** tem `<Link>` para `/produtos` e `/produtos/novo` (6a).
- **`ListaProdutos`** (Q1) é reutilizado e ampliado:
  - busca a lista na API com `useEffect` + Axios (6c);
  - cada item tem `<Link to={`/produtos/${produto.id}`}>` para abrir os detalhes (6d);
  - o botão **Excluir** chama `api.delete('/api/produtos/' + id)` (6e);
  - depois que a exclusão dá certo, `setProdutos(produtos.filter(p => p.id !== id))` tira o item do estado. O React renderiza de novo e a lista é atualizada sem recarregar a página (6f).
- **`DetalhesProduto`** (Q2) responde à rota `/produtos/:id`.
- **`CadastroProduto`** (Q3) responde à rota `/produtos/novo`.
