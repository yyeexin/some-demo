class Compile {
	constructor(el, vm) {
		this.$el = document.querySelector(el) //要遍历的宿主节点
		this.$vm = vm
		if (this.$el) {
			this.$fragment = this.node2Fragment(this.$el) //转换内部内容为片段Fragment
			this.compile(this.$fragment) //执行编译
			this.$el.appendChild(this.$fragment) //将编译完的html追加至$el
		}
	}

	// 将宿主元素中的代码片段拿出来遍历 这样做比较高效
	node2Fragment(el) {
		const frag = document.createDocumentFragment()
		// 将el中所有子元素搬家至frag中
		let child
		while ((child = el.firstChild)) {
			frag.appendChild(child)
		}
		return frag
	}

	// 编译过程
	compile(el) {
		const childNodes = el.childNodes
		Array.from(childNodes).forEach(node => {
			//类型判断
			if (this.isElement(node)) {
				const nodeAttrs = node.attributes
				Array.from(nodeAttrs).forEach(attr => {
					const attrName = attr.name //属性名
					const exp = attr.value //属性值
					if (this.isDirective(attrName)) {
						const dir = attrName.substring(2)
						this[dir] && this[dir](node, this.$vm, exp)
					}
					if (this.isEvent(attrName)) {
						let dir = attrName.substring(1)
						this.eventHandler(node, this.$vm, exp, dir)
					}
				})
			} else if (this.isInterpolation(node)) {
				this.compileText(node)
			}

			if (node.childNodes && node.childNodes.length > 0) this.compile(node) //递归子节点
		})
	}

	//更新函数
	update(node, vm, exp, dir) {
		const updaterFn = this[dir + 'Updater'] // 初始化
		updaterFn && updaterFn(node, vm[exp])
		new Watcher(vm, exp, function(value) {
			updaterFn && updaterFn(node, value) // 依赖收集
		})
	}

	compileText(node) {
		this.update(node, this.$vm, RegExp.$1, 'text')
	}

	eventHandler(node, vm, exp, dir) {
		let fn = vm.$options.methods && vm.$options.methods[exp]
		if (dir && fn) {
			node.addEventListener(dir, fn.bind(vm), false)
		}
	}

	// v-text
	text(node, vm, exp) {
		this.update(node, vm, exp, 'text')
	}

	// v-model
	model(node, vm, exp) {
		this.update(node, vm, exp, 'model')
		node.addEventListener('input', e => {
			let newValue = e.target.value
			vm[exp] = newValue
		})
	}

	// v-html
	html(node, vm, exp) {
		this.update(node, vm, exp, 'html')
	}

	textUpdater(node, value) {
		node.textContent = value
	}

	modelUpdater(node, value) {
		node.value = value
	}

	htmlUpdater(node, value) {
		node.innerHTML = value
	}

	isElement(node) {
		return node.nodeType === 1
	}

	isInterpolation(node) {
		return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
	}

	isDirective(attr) {
		return attr.indexOf('v-') === 0
	}

	isEvent(attr) {
		return attr.indexOf('@') === 0
	}
}
