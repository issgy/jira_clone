import React from "react"
// import { Select } from "antd"
// const { Option } = Select

export const SearchPanel = ({ users, param, setParam }) => {

    //setParam(Object.assign({},param,{name:evt.target.value}))
    return <form action="">
        <div>
            <input type='text' value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option>负责人</option>
                {users.map(user => <option key={user.id} value={user.name}>{user.name}</option>)}
            </select>
        </div>
    </form>
}