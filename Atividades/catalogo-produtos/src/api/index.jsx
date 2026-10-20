import axios from "axios";
// Base URL: http://localhost:8080
// Rota TODOS OS PRODUTOS: /api/produtos
// Produto com ID: /api/produtos/10
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
