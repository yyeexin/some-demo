// 查询draggable和droppable
const draggable = document.querySelector('.draggable')
const droppables = document.querySelectorAll('.droppable')

// 监听draggable的相关事件
draggable.addEventListener('dragstart', dragStart)
draggable.addEventListener('dragend', dragEnd)

function dragStart() {
	this.className += ' dragging'
	setTimeout(() => {
		this.className = 'invisible'
	}, 0)
}

function dragEnd() {
	this.className = 'draggable'
}

// 监听droppable的相关事件
for (const droppable of droppables) {
	droppable.addEventListener('dragover', dragOver)
	droppable.addEventListener('dragleave', dragLeave)
	droppable.addEventListener('dragenter', dragEnter)
	droppable.addEventListener('drop', dragDrop)
}

function dragOver(e) {
	e.preventDefault()
}

function dragEnter(e) {
	e.preventDefault()
	this.className += ' drag-over'
}

function dragLeave(e) {
	this.className = 'droppable'
}

function dragDrop(e) {
	this.className = 'droppable'
	this.append(draggable)
}
