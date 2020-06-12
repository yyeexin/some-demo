const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 定义schema,查询和类型
const schema = buildSchema(`
type Query {
	hello: String
	today: String
}`)

// 定义查询对应的处理器
const root = {
	hello: () => {
		return 'hello world !'
	},
	today: () => {
		return new Date().toLocaleString()
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
