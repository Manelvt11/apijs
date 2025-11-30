import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    fetch("http://localhost:8888/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const addUser = () => {
    fetch("http://localhost:8888/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade })
    })
      .then(res => res.json())
      .then(novo => setUsers([...users, novo]));

    setNome("");
    setIdade("");
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:8888/users/${id}`, {
      method: "DELETE"
    }).then(() => setUsers(users.filter(u => u.id !== id)));
  };

  return (
    <div className="caixa-principal">

      <button className="btn-tema" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Claro" : "🌙 Escuro"}
      </button>

      <h1>Cadastro de Usuários</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="Idade"
        value={idade}
        onChange={e => setIdade(e.target.value)}
      />

      <button className="btn-adicionar" onClick={addUser}>
        Adicionar
      </button>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.nome} — {u.idade} anos
            <button onClick={() => deleteUser(u.id)}>X</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;