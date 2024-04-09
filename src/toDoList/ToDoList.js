import React, { useState, useEffect } from "react";
import cx from "classnames";

import ToDoTable from "../components/toDoTable/ToDoTable";
import { getItemFromLocalStorage } from "./toDoList.helper";
import styles from "./toDoList.module.scss";

const ToDoList = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [itemList, setItemList] = useState(getItemFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(itemList));
  }, [itemList]);

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    setItemList((prev) => [...prev, { id: Date.now(), name: inputValue, checked: false }]);
    setInputValue('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.addTaskcontainer}>
        <input
          className={styles.inputBox}
          type="text"
          placeholder="New Todo"
          value={inputValue}
          onChange={handleChangeInput}
        />
        <button
          className={cx(styles.addButton, { [styles.disabled]: !inputValue })}
          onClick={handleAddItem}
          disabled={!inputValue}
        >
          Add Item
        </button>
      </div>
      <h1>To Do List</h1>
      <ToDoTable itemList={itemList} setItemList={setItemList} />
    </div>
  );
};
export default ToDoList;
