import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        async function loadProducts() {
            const data = await getProducts();
            setProducts(data.products);
        }
        loadProducts();
    }, [])

    return (
        <div className="container page-content">
            <h1 className="page-title">Catálogo de Produtos</h1>

            <div className="product-grid">
                {products.map(item => {
                    return (
                        <article key={item.id} className="product-card">
                            <img  className="product-image" src={item.thumbnail} alt={item.title} />
                            
                            <div className="product-info">
                                <strong className="product-title">{item.title}</strong>
                                <span className="product-category">{item.category}</span>
                                <span className="product-price">R$ {item.price}</span>
                                <span className="product-rating">Avaliação: {item.rating}</span>

                                <div className="product-actions">
                                    <Link className="btn" to={`/product/${item.id}`}>Ver detalhes</Link>
                                </div>
                                <button onClick={()=>salvarFilme()}>Salvar</button>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}