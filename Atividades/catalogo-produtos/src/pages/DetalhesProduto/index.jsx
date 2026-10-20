import { Component } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

class DetalhesProduto extends Component {

    state = {
        produto: null,
        loading: true,
        erro: "",
    };

    // executado uma única vez, logo após o componente ser montado
    async componentDidMount() {
        try {
            const response = await api.get("/api/produtos/" + this.props.id);
            this.setState({ produto: response.data, loading: false });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                this.setState({ erro: "Produto não encontrado.", loading: false });
            } else {
                this.setState({ erro: "Erro ao buscar o produto.", loading: false });
            }
        }
    }

    render() {
        const { produto, loading, erro } = this.state;

        if (loading) {
            return <p>Carregando produto...</p>;
        }

        if (erro || !produto) {
            return <p>{erro || "Produto não encontrado."}</p>;
        }

        return (
            <div>
                <h1>{produto.nome}</h1>
                <p>Preço: R$ {produto.preco}</p>
                <p>Estoque: {produto.estoque}</p>
            </div>
        );
    }
}

// lê o :id da rota /produtos/:id e repassa como prop para o componente de classe
export default function DetalhesProdutoRota() {
    const { id } = useParams();
    return <DetalhesProduto id={id} />;
}
