//Constructing Types
const express = require('express')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const AccountType = new GraphQLObjectType({
	name: 'Account',
	fields: {
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		sex: { type: GraphQLString },
		department: { type: GraphQLString }
	}
})

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: {
		account: {
			type: AccountType,
			args: {
				userName: { type: GraphQLString }
			},
			resolve: function(parent, { userName }) {
				const name = userName || '默认名称'
				const sex = 'man'
				const age = 18
				const department = '开发部'
				return {
					name,
					sex,
					age,
					department
				}
			}
		},
		hello: {
			type: GraphQLString,
			args: {
				userName: { type: GraphQLString }
			},
			resolve: function(parent, args) {
				return 'hello world,' + args.userName
			}
		}
	}
})

const schema = new GraphQLSchema({ query: QueryType })

const app = express()

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

app.use(express.static('public'))

app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'))
