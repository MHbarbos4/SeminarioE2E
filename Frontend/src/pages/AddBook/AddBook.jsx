import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";
 
const AddBook = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (formData.name && formData.description) {
      try {
        const response = await axios.post("http://localhost:5273/api/Livro", {
          nome: formData.name,
          descrição: formData.description,
        });
 
        if (response.status === 200 || response.status === 201) {
          // Exibe notificação de sucesso
          setNotification({
            message: "Livro cadastrado com sucesso!",
            type: "success",
          });
          setFormData({ name: "", description: "" }); // Limpa o formulário
        } else {
          // Exibe mensagem de erro caso não seja um status esperado
          setNotification({
            message: "Erro inesperado: Não foi possível cadastrar o livro.",
            type: "error",
          });
        }
      } catch (error) {
        // Erro na comunicação com a API
        setNotification({
          message: "Erro ao comunicar com a API. Tente novamente.",
          type: "error",
        });
        console.error("Erro ao fazer o POST:", error);
      }
    } else {
      // Campos obrigatórios não preenchidos
      setNotification({ message: "Preencha todos os campos!", type: "error" });
    }
 
    // Remove o popup após 5 segundos
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };
 
  return (
<div className="add-book">
<div className="card">
<h2>Cadastrar Livro</h2>
<form onSubmit={handleSubmit}>
<input
            type="text"
            name="name"
            placeholder="Nome do Livro"
            value={formData.name}
            onChange={handleInputChange}
          />
<textarea
            name="description"
            placeholder="Descrição do Livro"
            value={formData.description}
            onChange={handleInputChange}
></textarea>
<button type="submit">Cadastrar</button>
</form>
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
 
export default AddBook;