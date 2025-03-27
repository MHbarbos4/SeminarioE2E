import React, { useState } from "react";
import "./Login.css"; // Importe o CSS para a página de login

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para armazenar erro

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin({ username, password }); // Autentica o usuário
    } else {
      setError("Credenciais incorretas!"); // Mensagem de erro se login falhar
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={error ? "input-error" : ""}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={error ? "input-error" : ""}
          />
          <button type="submit">Entrar</button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro */}
        <p>
          <a href="#">Esqueceu a senha?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
