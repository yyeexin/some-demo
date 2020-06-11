const Promise = require('./Promise')

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('xixi')
	}, 1000)
})

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('haha')
	}, 5000)
})

Promise.race([p1, p2]).then(res => {
	console.log(res)
})
