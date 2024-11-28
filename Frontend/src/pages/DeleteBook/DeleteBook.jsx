import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";
import "./DeleteBook.css";
 
const DeleteBook = () => {
  const [books, setBooks] = useState([]); // Lista de livros carregados da API
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
 
  // Carrega os livros da API ao montar o componente
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
 
  // Atualiza o campo de pesquisa conforme o usuário digita
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
 
    if (query.trim() !== "") {
      const regex = new RegExp(query, "i");
      const results = books.filter((book) => regex.test(book.nome));
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  };
 
  // Seleciona uma sugestão de livro
  const handleSelectOption = (book) => {
    setSelectedBook(book);
    setFilteredBooks([]);
    setSearchQuery("");
  };
 
  // Exibe o popup de confirmação para exclusão
  const handleDelete = () => {
    setShowConfirmPopup(true);
  };
 
  // Confirma a exclusão do livro
  const confirmDelete = async () => {
    if (selectedBook) {
      try {
        const response = await axios.delete(
          `http://localhost:5273/api/Livro/${selectedBook.id}`
        );
 
        if (response.status === 204) {
          setNotification({
            message: "Livro excluído com sucesso!",
            type: "success",
          });
 
          // Remove o livro excluído da lista local
          setBooks(books.filter((book) => book.id !== selectedBook.id));
          setSelectedBook(null); // Limpa a seleção
        } else {
          setNotification({
            message: "Erro ao excluir o livro. Tente novamente.",
            type: "error",
          });
        }
      } catch (error) {
        setNotification({
          message: "Erro ao comunicar com a API. Tente novamente.",
          type: "error",
        });
        console.error("Erro ao excluir livro:", error);
      }
    }
 
    setShowConfirmPopup(false);
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };
 
  // Cancela a exclusão
  const cancelDelete = () => {
    setNotification({ message: "Exclusão cancelada!", type: "info" });
    setShowConfirmPopup(false);
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };
 
  return (
<div className="delete-book-container">
<div className={`delete-book ${showConfirmPopup ? "blurred" : ""}`}>
<div className="card">
<h2>Excluir Livro</h2>
 
          {/* Campo de pesquisa */}
<div className="search">
<input
              type="text"
              placeholder="Digite o nome do livro"
              value={searchQuery}
              onChange={handleSearchChange}
            />
<button>
<MagnifyingGlass size={20} weight="light" />
</button>
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
 
          {/* Exibe informações do livro selecionado */}
          {selectedBook && (
<div className="selected-book">
<h3>{selectedBook.nome}</h3>
<button className="delete-button" onClick={handleDelete}>
                Excluir
</button>
</div>
          )}
</div>
</div>
 
      {/* Popup de confirmação */}
      {showConfirmPopup && (
<div className="confirm-popup">
<p>Você tem certeza que deseja excluir este livro?</p>
<div className="popup-actions">
<button onClick={confirmDelete}>Sim</button>
<button onClick={cancelDelete}>Não</button>
</div>
</div>
      )}
 
      {/* Notificação */}
      {notification.message && (
<div
          className={`notification ${notification.type}`}
          style={{
            backgroundColor:
              notification.type === "success"
                ? "#4CAF50"
                : notification.type === "error"
                ? "red"
                : "red",
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
 
export default DeleteBook;