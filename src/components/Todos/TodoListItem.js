import React, { useState, useCallback } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDelete } from "react-icons/md";
import cn from "classnames";
import "./TodoListItem.scss";

const TodoListItem = ({
  todo,
  onRemove,
  onToggle,
  // onDoubleClick,
  // setDoubleClick,
}) => {
  const { id, text, checked, togglefilter } = todo;

  // const [patchValue, setPatchValue] = useState(text);
  // const setDoubleClick = useCallback((e) => {
  //   setPatchValue(patchValue);
  //   if (e.keyCode === 13) {
  //     e.target.contentEditable = false;
  //   }
  // }, []);

  // console.log(double);
  // console.log('id', id);
  return (
    <div className="TodoListItem">
      <div
        className={cn("checkbox", { checked })}

        // onToggle={onToggle}
      >
        {checked ? (
          <MdCheckBox
            onClick={() => {
              onToggle(id);
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              onToggle(id);
            }}
          />
        )}
        <div
          className="text"
          // contenteditable={double}
          // contentEditable={double}
          // onClick={() => {
          //   onDoubleClick(id, double);
          // }}
          // onKeyUp={(e) => setDoubleClick(e)}
        >
          {text}
        </div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdDelete />
      </div>
    </div>
  );
};

export default TodoListItem;
