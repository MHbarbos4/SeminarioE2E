import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
 
const Home = () => {
  const [statusAPI, setStatusAPI] = useState(""); // Para armazenar o status da conexão com a API
  const [loading, setLoading] = useState(false);  // Para controlar o estado de carregamento
  const [errorMessage, setErrorMessage] = useState(""); // Para mensagens de erro detalhadas
 
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Ativa o estado de carregamento
      setStatusAPI(""); // Reseta o status anterior
      setErrorMessage(""); // Reseta qualquer mensagem de erro anterior
 
      try {
        // Simulação de erro proposital: Requisição para uma URL inexistente
        // *** Erro proposital aqui ***
      //  const response = await axios.get("http://localhost:5273/api/invalidEndpoint");
 
        // Código correto (comentado para simulação de erro)
         const response = await axios.get("http://localhost:5273/api/Livro");
 
        setStatusAPI("API CONECTADA COM SUCESSO");
        setLoading(false); // Desativa o carregamento quando a resposta chega
      } catch (error) {
        setLoading(false); // Desativa o carregamento quando ocorre erro
        setStatusAPI("FALHA NA CONEXÃO COM A API");
        // Detalha o erro com base no tipo de falha
        if (error.response) {
          // Se a resposta foi recebida, mas com erro (ex: 404, 500)
          setErrorMessage(`Erro no servidor: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          // Se a requisição foi feita, mas não houve resposta
          setErrorMessage("Erro de rede: Não foi possível conectar ao servidor.");
        } else {
          // Se ocorreu outro tipo de erro
          setErrorMessage(`Erro desconhecido: ${error.message}`);
        }
        console.error("Erro ao buscar livros:", error);
      }
    };
 
    fetchBooks();
  }, []);
 
  return (
<div className="add-book">
<div className="card">
<h2>Bem-vindo ao Sistema de Cadastro de Livros</h2>
<p>Gerencie seus livros de forma eficiente!</p>
        {loading && <div className="loading">Carregando...</div>} {/* Exibe uma mensagem de carregamento */}
 
        <div className={`notification ${statusAPI === "API CONECTADA COM SUCESSO" ? "success" : "error"}`}>
          {statusAPI}
</div>
 
        {/* Se houver uma mensagem de erro detalhada, exibe abaixo */}
        {errorMessage && <div className="error-details">{errorMessage}</div>}
</div>
</div>
  );
};
 
export default Home;