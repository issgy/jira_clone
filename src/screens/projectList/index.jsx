import React, { useState, useEffect } from "react"
import { SearchPanel } from "./searchPanel";
import { List } from "./list";
import { Fragment } from "react";
import { cleanObject } from "utils";
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL
console.log(process.env.REACT_APP_API_URL)
console.log(apiUrl)

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])

    useEffect(() => {
        //回调函数内写获取列表的逻辑
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])//当param改变的时候执行回调函数
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])
    return <Fragment>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
        <div>this is task</div>
    </Fragment>
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        //每次value變化以後，設置一個定時器
        const timeout = setTimeout(() => setDebouncedValue(value))
        //每次在上一個useEffect處理完以後再運行
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    return debouncedValue
}