import React, { Component } from "react";
import { pathToRegexp } from "path-to-regexp";

import { Consumer } from "./context";

export default class Route extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Consumer>
                {(state) => {
                    //path是router中传递的
                    let {
                        path,
                        component: Component,
                        exact = false,
                    } = this.props;
                    //pathname是location中的
                    let { pathname } = state.location;
                    let keys = [];
                    let reg = pathToRegexp(path, keys, { end: exact });
                    keys = keys.map((item) => item.name);
                    let result = pathname.match(reg);
                    let [url, ...values] = result || [];
                    if (result) {
                        let props = {
                            location: state.location,
                            history: state.history,
                            match: {
                                params: keys.reduce((obj, current, index) => {
                                    obj[current] = values[index];
                                    return obj;
                                }, {}),
                            },
                        };
                        return <Component {...props} />;
                    }
                    return null;
                }}
            </Consumer>
        );
    }
}
