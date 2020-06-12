const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const schema = buildSchema(`
type Account {
    id:String
	name:String
	age:Int
	department:String
	salary(city:String):Int
}

input AccountInput{
    name: String
	age: Int
	department: String
	salary: Int
}

type Query {
	account:[Account]
}

type Mutation {
	createAccount(input:AccountInput):Account
	updateAccount(id:ID!,input:AccountInput):Account
}
`)
const db = [
	{
		id: '1561626418730',
		name: '张三',
		age: 12,
		salary: 3000
	},
	{
		id: '1561626499123',
		name: '李四',
		age: 34,
		salary: 5000
	}
]

// 定义查询对应的处理器
const root = {
	account: () => {
		return db
	},
	createAccount: ({ input }) => {
		const id = new Date()
		db.push({ ...input, id })
		return { ...input, id }
	},
	updateAccount: ({ id, input }) => {
		let index = db.findIndex(item => item.id === id)
		if (index < 0) {
			return {
				id: '查无此账户'
			}
		}
		let newAccount = Object.assign({}, db[index], input)
		db[index] = newAccount
		return newAccount
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

/**
 *   {
   account {
     id
     name
     age
     salary
   }
 }

 mutation{
   createAccount(input:{
     name:"李四"
     age:34
   }){
     name
  }
 }

mutation{
  updateAccount(id:222,input:{
    name:"王五"
  }){
    id
    name
    salary
  }
}

 * 
 */
