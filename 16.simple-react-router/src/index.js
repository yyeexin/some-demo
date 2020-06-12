import React from 'react'
import ReactDOM from 'react-dom'
import {
	HashRouter as Router,
	Route,
	Link,
	Redirect,
	Switch
} from './react-router-dom'

import Home from './Home'
import Profile from './Profile'
import User from './User'

const App = () => {
	return (
		<Router>
			<div>
				<Link to="/home">首页</Link>
				<Link to="/profile">个人中心</Link>
				<Link to="/user">用户</Link>
			</div>
			<div>
				<Switch>
					<Route path="/home/123" component={Home} />
					<Route path="/home" exact component={Home} />
					<Route path="/profile" component={Profile} />
					<Route path="/user" component={User} />
					<Redirect to="/home" />
				</Switch>
			</div>
		</Router>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
