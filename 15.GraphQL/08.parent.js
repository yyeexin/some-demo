const express = require('express')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql')
const graphqlHTTP = require('express-graphql')

const PhoneNumberType = new GraphQLObjectType({
	name: 'PhoneNumber',
	fields: {
		userId: { type: GraphQLID },
		phoneNumber: { type: GraphQLString },
		createdAt: { type: GraphQLString }
	}
})

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		userId: { type: GraphQLID },
		name: { type: GraphQLString },
		phones: {
			type: GraphQLList(PhoneNumberType),
			resolve: function(parent, args) {
				let data = []
				phone.forEach(element => {
					if (element.userId == parent.userId) {
						data.push(element)
					}
				})
				return data
			}
		}
	}
})

const db = [{ userId: '0', name: '张三' }, { userId: '1', name: '李四' }, { userId: '2', name: '王五' }]

const phone = [
	{ userId: '0', phoneNumber: '00032310', createdAt: '20190704' },
	{ userId: '0', phoneNumber: '0dsfsf000', createdAt: '20190704' },
	{ userId: '0', phoneNumber: '0213123000', createdAt: '20190704' },
	{ userId: '0', phoneNumber: '00dsfsf00', createdAt: '20190704' },
	{ userId: '1', phoneNumber: '11dddd11', createdAt: '20190704' },
	{ userId: '1', phoneNumber: '1121331211', createdAt: '20190704' },
	{ userId: '1', phoneNumber: '115454511', createdAt: '20190704' },
	{ userId: '2', phoneNumber: '226565622', createdAt: '20190704' },
	{ userId: '2', phoneNumber: '2234322', createdAt: '20190704' },
	{ userId: '2', phoneNumber: '22656522', createdAt: '20190704' },
	{ userId: '2', phoneNumber: '276767222', createdAt: '20190704' },
	{ userId: '2', phoneNumber: '22544622', createdAt: '20190704' }
]

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: {
		getAllUsers: {
			type: GraphQLList(UserType),
			resolve: function(parent, args) {
				return db
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
