import { useState } from "react";
import api from "../../api";

export default function CadastroProduto() {

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post("/api/produtos", {
                nome,
                preco: Number(preco),
                categoria,
                estoque: Number(estoque),
            });
            setMensagem("Produto cadastrado com sucesso!");
            setNome("");
            setPreco("");
            setCategoria("");
            setEstoque("");
        } catch {
            setMensagem("Erro ao cadastrar o produto.");
        }
    }

    return (
        <div>
            <h1>Cadastrar produto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome: </label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Preço: </label>
                    <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </div>
                <div>
                    <label>Categoria: </label>
                    <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </div>
                <div>
                    <label>Estoque: </label>
                    <input type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}
