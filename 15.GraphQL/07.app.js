const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const mysql = require('mysql2')
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'test_db',
	connectionLimit: 10,
	queueLimit: 5
})

// 定义schema,查询和类型
const schema = buildSchema(`
type Account {
	id:ID
	name:String
	age:Int
	sex:String
	department:String
}

input AccountInput {
	name:String
	age:Int
	sex:String
	department:String
}

type Query {
	findAllAccount(current:Int,pageSize:Int):[Account]
}

type Mutation {
	createAccount(input:AccountInput):Account
	deleteAccount(id:ID!):Boolean
	updateAccount(id:ID!,input:AccountInput):Boolean
}
`)

// 定义查询对应的处理器
const root = {
	findAllAccount: ({ current = 1, pageSize = 2 }) => {
		return new Promise((resolve, reject) => {
			pool.query('select * from account limit ?,?', [(current - 1) * pageSize, pageSize], (error, result) => {
				if (error) {
					console.log('出错了,' + error.message)
					return
				}
				resolve(result)
			})
		})
	},
	createAccount: ({ input }) => {
		return new Promise((resolve, reject) => {
			pool.query('insert into account set ?', input, (error, result) => {
				if (error) {
					console.log('出错了,' + error.message)
					return
				}
				const { insertId } = result
				resolve({ ...input, id: insertId })
			})
		})
	},
	deleteAccount: ({ id }) => {
		return new Promise((resolve, reject) => {
			pool.query('delete from account where id = ?', [id], (error, result) => {
				if (error) {
					console.log('出错了,' + error.message)
					return
				}
				const { affectedRows } = result
				resolve(!!affectedRows)
			})
		})
	},
	updateAccount: ({ id, input }) => {
		return new Promise((resolve, reject) => {
			pool.query('update account set ? where id = ?', [input, id], (error, result) => {
				if (error) {
					console.log('出错了,' + error.message)
					return
				}
				const { affectedRows } = result
				resolve(!!affectedRows)
			})
		})
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

app.use(express.static('public'))

app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'))
