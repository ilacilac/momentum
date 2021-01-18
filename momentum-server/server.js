// app.get("/todos", (req, res) => {
//   res.send(todos);
//   // res.send(todos);
// });

const express = require("express");
const app = express();
const PORT = 5000;

let todos = [
  {
    id: 3,
    text: "Redux / Redux-saga 배우기",
    checked: false,
    double: false,
  },
  {
    id: 2,
    text: "React hook 공부하기",
    checked: true,
    double: false,
  },
  {
    id: 1,
    text: "리액트 해커톤",
    checked: true,
    double: false,
  },
];

app.use(express.json());

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const { id, text, checked, double } = req.body;
  todos = [{ id, text, checked, double }, ...todos];
  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== +id);
  res.send(todos);
  // res.send(todos);
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;

  todos = todos.map((todo) =>
    todo.id === +id ? { ...todo, checked: !todo.checked } : todo
  );
  res.send(todos);
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
