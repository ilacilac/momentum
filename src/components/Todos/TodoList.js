import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({
  todos,
  onRemove,
  onToggle,
  changeName,
  togglefilter,
  // onDoubleClick,
  // setDoubleClick,
}) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
          changeName={changeName}

          // onDoubleClick={onDoubleClick}
          // onKeyup={setDoubleClick}
        />
      ))}
    </div>
  );
};

export default TodoList;
