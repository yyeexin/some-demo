const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 定义schema,查询和类型
const schema = buildSchema(`
type Account {
	name:String
	age:Int
	department:String
	salary(city:String):Int
}

type Query {
	account( userName: String ):Account
}`)

// 定义查询对应的处理器
const root = {
	account: ({ userName }) => {
		return {
			name: userName,
			age: 18,
			department: '开发部',
			salary({ city }) {
				if (city == '北京' || city == '上海' || city == '广州') {
					return 20000
				} else {
					return 10000
				}
			}
		}
	}
}

const app = express()

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	})
)

app.listen(4000)
