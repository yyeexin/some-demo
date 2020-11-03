import React, { Component } from "react";
import { Consumer } from "./context";
import { pathToRegexp } from "path-to-regexp";

//作用:只匹配一个组件
export default class Switch extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Consumer>
                {(state) => {
                    let pathname = state.location.pathname;
                    let children = this.props.children;
                    for (let i = 0; i < children.length; i++) {
                        let child = children[i];
                        let path = child.props.path || ""; //redirect可能没有path属性
                        let reg = pathToRegexp(path, [], { end: false });
                        if (reg.test(pathname)) {
                            return child;
                        }
                    }
                    return null;
                }}
            </Consumer>
        );
    }
}
