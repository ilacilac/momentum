import React, { useState, useCallback, useEffect, useRef } from "react";
import TodoTemplate from "./components/Todos/TodoTemplate";
import TodoInsert from "./components/Todos/TodoInsert";
import TodoList from "./components/Todos/TodoList";
import axios from "axios";
// import { getTodos } from '../api/posts';
const TodosApp = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    let response;
    async function getTodos() {
      response = await axios
        .get("/todos")
        .then((res) => res.data)
        .catch((err) => console.error(err));
      setTodos(response);
    }
    getTodos();
  }, []);
  let generateId = todos.length
    ? Math.max(...todos.map((todo) => todo.id)) + 1
    : 1;
  const nextId = useRef(generateId);
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: generateId,
        text,
        checked: false,
        double: false,
      };
      axios
        .post("/todos", todo) //
        .then((_todos) => setTodos(_todos.data))
        .then((nextId.current += 1));
    },
    [generateId]
  );
  const onRemove = useCallback((id) => {
    axios
      .delete(`/todos/${id}`) //
      .then((_todos) => setTodos(_todos.data))
      .catch((err) => console.error(err));
  }, []);
  const onToggle = (id) => {
    axios
      .patch(`/todos/${id}`, { id }) //
      .then((_todos) => setTodos(_todos.data))
      .catch((err) => console.error(err));
  };

  //  수정작업
  const onDoubleClick = useCallback(
    (id, double) => {
      console.log("double click on");
      const _todos = todos.map((todo) =>
        todo.id === id ? { ...todo, double: !todo.double } : todo
      );
      let patchTodo = _todos.filter((todo) => {
        return todo.id === id;
      });
      // *해결해야됨
      // patchTodo = patchTodo[0];
      // axios.patch(`http://localhost:4000/todos/${id}`, {
      //   ...patchTodo,
      // });
      setTodos(_todos);
    },
    [todos]
  );
  const togglefilter = (onName) => {
    // 수정필요
    let _todos = todos;
    switch (onName) {
      // 전체 todos
      case "inbox":
        // setTodos(todos);
        break;
      // 완료된 todos
      case "Done":
        const doneTodos = _todos.filter((todo) => todo.checked);
        // setTodos(doneTodos);
        break;
      // return doneTodos;
      default:
    }
  };
  return (
    <>
      <button className="mainTodoBtn">todos</button>
      <TodoTemplate todos={todos} togglefilter={togglefilter}>
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          togglefilter={togglefilter}
        />
        <TodoInsert onInsert={onInsert} />
      </TodoTemplate>
    </>
  );
};
export default TodosApp;
