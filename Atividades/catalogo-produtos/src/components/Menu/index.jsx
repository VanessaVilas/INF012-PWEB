import { Link } from "react-router-dom";

export default function Menu() {

    return (
        <nav>
            <Link to="/produtos">Produtos</Link>
            {" | "}
            <Link to="/produtos/novo">Cadastrar produto</Link>
        </nav>
    )
}
