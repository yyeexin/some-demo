const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 定义schema,查询和类型
const schema = buildSchema(`
type Query {
    hello( name: String ): String
	greet( name: String! ): String
	people( amount: Int! ): [String]
}`)

// 定义查询对应的处理器
const root = {
	hello: ({ name }) => {
		return name ? '你好,' + name + '!' : '你好!'
	},
	greet: ({ name }) => {
		return name ? '你好,' + name + '!' : '你好!'
	},
	people: ({ amount }) => {
		function getRandomChar() {
			let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
			let maxPos = $chars.length
			return $chars.charAt(Math.floor(Math.random() * maxPos))
		}
		let arr = []
		for (let i = 0; i < amount; i++) {
			let name = getRandomChar() + getRandomChar() + getRandomChar()
			arr.push(name)
		}
		return arr
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
