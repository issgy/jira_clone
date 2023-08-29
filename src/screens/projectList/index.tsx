import React, { useState, useEffect } from "react";
import { SearchPanel } from "./searchPanel";
import { List } from "./list";
import { Fragment } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);
console.log(apiUrl);

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    //回调函数内写获取列表的逻辑
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`,
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]); //当param改变的时候执行回调函数

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }); //空数组，只在页面加载的时候执行一次

  return (
    <Fragment>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Fragment>
  );
};
