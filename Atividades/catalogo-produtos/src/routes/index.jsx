import { BrowserRouter, Route, Routes } from "react-router-dom"
import Menu from "../components/Menu"
import ListaProdutos from "../pages/ListaProdutos"
import CadastroProduto from "../pages/CadastroProduto"
import DetalhesProduto from "../pages/DetalhesProduto"

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
    )
}
