import React from "react";
import { Link } from "./react-router-dom";
const UserList = () => {
    return (
        <div>
            <div>UserList</div>
            <ul>
                <li>
                    <Link to="/user/detail/1">用户1</Link>
                </li>
                <li>
                    <Link to="/user/detail/2">用户2</Link>
                </li>
                <li>
                    <Link to="/user/detail/3">用户3</Link>
                </li>
            </ul>
        </div>
    );
};

export default UserList;
