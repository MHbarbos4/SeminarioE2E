import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react"; // Ícone de lupa
import "./EditBook.css";
 
const EditBook = () => {
  const [books, setBooks] = useState([]); // Armazena os livros obtidos da API
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
 
  // Busca os livros da API ao montar o componente
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5273/api/Livro");
        setBooks(response.data); // Armazena os livros no estado
      } catch (error) {
        setNotification({
          message: "Erro ao carregar os livros. Tente novamente mais tarde.",
          type: "error",
        });
        console.error("Erro ao buscar livros:", error);
      }
    };
 
    fetchBooks();
  }, []);
 
  // Atualiza o campo de input conforme o usuário digita
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
 
    if (query.trim() !== "") {
      const regex = new RegExp(query, "i");
      const results = books.filter((book) => regex.test(book.nome)); // Busca pelo nome
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  };
 
  // Seleciona uma sugestão de livro
  const handleSelectOption = (book) => {
    setSelectedBook(book); // Define o livro selecionado
    setFilteredBooks([]); // Esconde a lista de sugestões
    setSearchQuery(""); // Limpa o campo de pesquisa
  };
 
  // Alterar valores nos campos de edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };
 
  // Salvar as alterações no livro
  const handleSave = async () => {
    if (selectedBook?.nome && selectedBook?.descrição) {
      try {
        const response = await axios.put(
          `http://localhost:5273/api/Livro/${selectedBook.id}`,
          {
            id: selectedBook.id,
            nome: selectedBook.nome,
            descrição: selectedBook.descrição,
          }
        );
 
        if (response.status === 200) {
          setNotification({
            message: "Livro atualizado com sucesso!",
            type: "success",
          });
        } else {
          setNotification({
            message: "Erro ao atualizar o livro. Tente novamente.",
            type: "error",
          });
        }
      } catch (error) {
        setNotification({
          message: "Erro ao comunicar com a API. Tente novamente.",
          type: "error",
        });
        console.error("Erro ao fazer o PUT:", error);
      }
    } else {
      setNotification({ message: "Preencha todos os campos!", type: "error" });
    }
 
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };
 
  return (
<div className="edit-book">
<div className="card">
<h2>Editar Livro</h2>
 
        {/* Campo de pesquisa */}
<div className="search">
<input
            type="text"
            placeholder="Digite o nome do livro"
            value={searchQuery}
            onChange={handleSearchChange}
          />
</div>
 
        {/* Lista de sugestões */}
        {filteredBooks.length > 0 && (
<ul className="dropdown">
            {filteredBooks.map((book) => (
<li key={book.id} onClick={() => handleSelectOption(book)}>
                {book.nome}
</li>
            ))}
</ul>
        )}
 
        {/* Formulário de edição ou mensagem de erro */}
        {selectedBook ? (
<form>
<input
              type="text"
              name="nome"
              placeholder="Nome do Livro"
              value={selectedBook.nome}
              onChange={handleInputChange}
            />
<textarea
              name="descrição"
              placeholder="Descrição do Livro"
              value={selectedBook.descrição}
              onChange={handleInputChange}
></textarea>
<button type="button" onClick={handleSave}>
              Salvar
</button>
</form>
        ) : searchQuery && (
<p className="not-found">Livro não encontrado!</p>
        )}
</div>
 
      {/* Popup de notificação */}
      {notification.message && (
<div
          className={`notification ${notification.type}`}
          style={{
            backgroundColor: notification.type === "success" ? "#4CAF50" : "red",
            color: "white",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
>
          {notification.message}
</div>
      )}
</div>
  );
};
 
export default EditBook;