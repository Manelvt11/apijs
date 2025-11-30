const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let nextId = 1;

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { nome, idade } = req.body;

  const novo = {
    id: nextId++,
    nome,
    idade
  };

  users.push(novo);
  res.json(novo);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "Usuário removido" });
});

app.listen(8888, () => console.log("Servidor rodando na porta 8888"));