import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import AddBook from "./pages/AddBook/AddBook";
import EditBook from "./pages/EditBook/EditBook";
import DeleteBook from "./pages/DeleteBook/DeleteBook";
import ViewBooks from "./pages/ViewBooks/ViewBooks";
import Login from "./pages/Login/Login"; // Página de login

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para autenticar o usuário
  const handleLogin = ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true); // Autentica o usuário
    } else {
      alert("Credenciais incorretas");
    }
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Exibe Sidebar somente se o usuário estiver autenticado */}
        {isAuthenticated && <Sidebar />}
        <div style={{ marginLeft: isAuthenticated ? "80px" : "0", padding: "20px", width: "100%" }}>
          <Routes>
            {/* Se o usuário não estiver autenticado, exibe a página de login */}
            {!isAuthenticated ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                {/* Páginas protegidas (só acessíveis se autenticado) */}
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/edit" element={<EditBook />} />
                <Route path="/delete" element={<DeleteBook />} />
                <Route path="/view" element={<ViewBooks />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
