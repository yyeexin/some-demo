class Vue {
	constructor(options) {
		this.$options = options

		//数据响应化
		this.$data = options.data
		this.observe(this.$data)

		new Compile(options.el, this)

		// created执行
		if (options.created) {
			options.created.call(this)
		}
	}

	observe(dataObj) {
		if (!dataObj || typeof dataObj !== 'object') return
		Object.keys(dataObj).forEach(key => {
			this.defineReactive(dataObj, key, dataObj[key])
			this.proxyData(key) // 代理data中的属性到vue实例上
		})
	}

	defineReactive(dataObj, key, val) {
		this.observe(val) // 递归解决数据嵌套问题
		const dep = new Dep()
		Object.defineProperty(dataObj, key, {
			get() {
				Dep.target && dep.add(Dep.target)
				return val
			},
			set(newVal) {
				if (newVal === val) return
				val = newVal
				dep.notify()
			}
		})
	}

	proxyData(key) {
		Object.defineProperty(this, key, {
			get() {
				return this.$data[key]
			},
			set(newVal) {
				this.$data[key] = newVal
			}
		})
	}
}

//Dep: 用来管理Watcher
class Dep {
	constructor() {
		this.deps = [] //这里存放着若干依赖（watcher）
	}
	add(dep) {
		this.deps.push(dep)
	}
	notify() {
		this.deps.forEach(dep => dep.update())
	}
}

class Watcher {
	constructor(vm, key, callback) {
		this.vm = vm
		this.key = key
		this.callback = callback
		Dep.target = this //将当前watcher实例指定到Dep静态属性target
		this.vm[this.key] //为了触发getter添加相应的依赖
		Dep.target = null
	}
	update() {
		this.callback.call(this.vm, this.vm[this.key])
	}
}
