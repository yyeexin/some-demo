const Promise = require('./Promise')

const p = new Promise((resolve, reject) => {
	resolve(123)
})

console.log(p)
