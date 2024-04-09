import React, {useState} from "react";
import cx from "classnames";

import Assets from "../../assets/Assets";
import styles from "./toDoItems.module.scss";

const ToDoItems = ({ item, setItemList, activeFilter }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [inputVal, setInputVal] = useState(item.name);

  const handleChangeCheck = (id) => {
    setItemList((prev) =>
      prev.map((data) => {
        if (data.id === id) return { ...data, checked: !item.checked };
        return data;
      })
    );
  };

 const handleInputKeyDown  = (e) => {
    if(e.keyCode === 13 && inputVal) {
        setItemList((prev) =>
        prev.map((data) => {
          if (data.id === item.id) return { ...data, name: inputVal};
          return data;
        })
        );
        setIsEdit(false);
    }
 }

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    setItemList((prev) => prev.filter((data) => data.id !== id));
  };

  return (
    <div className={styles.conatiner}>
      {isEdit ? (
        <input
          className={styles.input}
          type="text"
          onChange={(e)=> setInputVal(e.target.value)}
          onKeyDown={handleInputKeyDown}
          value={inputVal}
          onBlur={() => setIsEdit(false)}
          autoFocus
        />
      ) : (
        <div className={cx(styles.name, { [styles.checked]: item.checked })}>
          {item.name}
        </div>
      )}
      <div className={styles.button}>
        <input
          type="checkBox"
          checked={item.checked}
          onClick={() => handleChangeCheck(item.id)}
          className={cx(styles.checkBox, {[styles.disabledCheckBox]: activeFilter!=='all'})}
          disabled={activeFilter!=='all'}
        />
        <button className={styles.edit} onClick={handleEdit} disabled={item.checked}>
          ✍🏻
        </button>
        <button className={styles.delete} onClick={() => handleDelete(item.id)}>
          <img src={Assets.DELETE} alt="delete row" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
export default ToDoItems;
