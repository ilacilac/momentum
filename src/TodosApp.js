import React, {useState, useCallback, useEffect, useRef} from "react";
import TodoTemplate from "./components/Todos/TodoTemplate";
import TodoInsert from "./components/Todos/TodoInsert";
import TodoList from "./components/Todos/TodoList";
import axios from "axios";
// import { getTodos } from '../api/posts';
const TodosApp = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  console.log(todos.length);
  // console.log(todosLength);
  useEffect(() => {
    let response;
    async function getTodos() {
      response = await axios
        .get("http://localhost:4000/todos")
        .then((res) => res.data)
        .catch((err) => console.error(err));
      setTodos(response);
    }
    getTodos();
  }, []);
  // const nextId = useRef(todos.id);
  let generateId = todos.length
    ? Math.max(...todos.map((todo) => todo.id)) + 1
    : 1;
  // *해결해야됨
  const nextId = useRef(generateId);
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: generateId,
        text,
        checked: false,
        double: false,
      };
      axios.post("http://localhost:4000/todos", todo);
      setTodos(todos.concat(todo));
      // generateId += 1;
      // console.log(test);
      nextId.current += 1;
      // getTodos();
    },
    [todos, generateId]
  );
  const onRemove = useCallback(
    (id) => {
      axios.delete(`http://localhost:4000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );
  const onToggle = useCallback(
    (id) => {
      const _todos = todos.map((todo) =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      );
      let patchTodo = _todos.filter((todo) => {
        return todo.id === id;
      });
      // *해결해야됨
      patchTodo = patchTodo[0];
      axios.patch(`http://localhost:4000/todos/${id}`, {
        ...patchTodo,
      });
      setTodos(_todos);
    },
    [todos]
  );
  // 시간될 경우 수정작업
  const onDoubleClick = useCallback(
    (id, double) => {
      console.log("double click on");
      const _todos = todos.map((todo) =>
        todo.id === id ? {...todo, double: !todo.double} : todo
      );
      console.log(_todos);
      let patchTodo = _todos.filter((todo) => {
        return todo.id === id;
      });
      console.log(patchTodo);
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
        console.log(todos);
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
  // const [test, setTeest] = useState(todos);
  // console.log(test);
  // console.log(todos);
  // console.log("todosLength", todosLength);
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
