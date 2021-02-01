import React from "react";

const UserAdd = (props) => {
    const text = React.createRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(text.current.value);
        props.history.push("/user/list");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input ref={text} />
            <button type="submit">提交</button>
        </form>
    );
};

export default UserAdd;
