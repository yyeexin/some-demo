import React from "react";
import { Link, Route } from "./react-router-dom";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import UserDetail from "./UserDetail";

const User = () => {
    return (
        <div>
            <section>
                <Link to="/user/add">用户添加</Link>
                <Link to="/user/list">用户列表</Link>
            </section>
            <section>
                <Route path="/user/add" component={UserAdd}></Route>
                <Route path="/user/list" component={UserList}></Route>
                <Route path="/user/detail/:id" component={UserDetail}></Route>
            </section>
        </div>
    );
};

export default User;
