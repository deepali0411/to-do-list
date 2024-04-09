import React, { useMemo, useState, useEffect } from "react";
import cx from "classnames";

import ToDoItems from "../toDoItems/ToDoItems";
import styles from "./toDoTable.module.scss";

const ToDoTable = (props) => {
  const { itemList, setItemList } = props;
  const [filterdItemList, setFilteredItemList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if(activeFilter === 'all') setFilteredItemList(itemList);
    else if(activeFilter === 'done')   setFilteredItemList(() => itemList.filter((data) => data.checked));
    else setFilteredItemList(() => itemList.filter((data) => !data.checked));
  }, [itemList]);

  const handleDeleteChecked = () => {
    setItemList((prev) => prev.filter((data) => !data.checked));
  };
  const handleDeleteAll = () => {
    setItemList([]);
  };

  const renderTable = useMemo(() => {
    return filterdItemList.map((item) => {
      return (
        <ToDoItems
          item={item}
          setItemList={setItemList}
          activeFilter={activeFilter}
        />
      );
    });
  }, [filterdItemList]);

  const handleAddFilter = (filterType) => {
    setActiveFilter(filterType);
    if (filterType == "all") setFilteredItemList(itemList);
    else if (filterType === "done")
      setFilteredItemList(() => itemList.filter((data) => data.checked));
    else setFilteredItemList(() => itemList.filter((data) => !data.checked));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <button
          onClick={() => handleAddFilter("all")}
          className={cx(styles.filterButton, {
            [styles.active]: activeFilter === "all",
          })}
        >
          All
        </button>
        <button
          onClick={() => handleAddFilter("done")}
          className={cx(styles.filterButton, {
            [styles.active]: activeFilter === "done",
          })}
        >
          Done
        </button>
        <button
          onClick={() => handleAddFilter("todo")}
          className={cx(styles.filterButton, {
            [styles.active]: activeFilter === "todo",
          })}
        >
          Todo
        </button>
      </div>
      <div className={styles.tableContainer}>{renderTable}</div>
      {filterdItemList != "" && (
        <div className={styles.deleteButtons}>
          <button
            onClick={handleDeleteChecked}
            className={styles.deleteButton}
            disabled={!itemList}
          >
            Delete done tasks
          </button>
          <button
            onClick={handleDeleteAll}
            className={styles.deleteButton}
            disabled={!itemList}
          >
            Delete all tasks
          </button>
        </div>
      )}
    </div>
  );
};
export default ToDoTable;
