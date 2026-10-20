import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export default function ListaProdutos() {

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

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

    async function excluirProduto(id) {
        try {
            await api.delete("/api/produtos/" + id);
            // atualiza a lista sem recarregar a página
            setProdutos(produtos.filter((produto) => produto.id !== id));
        } catch {
            setErro("Não foi possível excluir o produto.");
        }
    }

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <div>
            <h1>Produtos</h1>
            {erro && <p>{erro}</p>}
            {!erro && produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
            <ul>
                {produtos.map((produto) => {
                    return (
                        <li key={produto.id}>
                            <strong>{produto.nome}</strong>
                            <p>Preço: R$ {produto.preco}</p>
                            <p>Categoria: {produto.categoria}</p>
                            <Link to={`/produtos/${produto.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
