window.addEventListener('load', function() {
	//1.获取元素
	var focusWidth = document.querySelector('.focus').offsetWidth
	var ul = document.querySelector('.focus').children[0]
	var ol = document.querySelector('.circle')
	var index = 0
	var timer = null

	function autoPlay() {
		index++
		var translatex = -index * focusWidth
		ul.style.transition = 'all 1s'
		ul.style.transform = 'translateX(' + translatex + 'px)'
		ol.querySelector('.current').classList.remove('current')
		ol.children[index % 3].classList.add('current')
	}

	timer = setInterval(autoPlay, 2000)

	//2.实现无缝滚动  过渡完成之后再去判断
	ul.addEventListener('transitionend', function() {
		if (index >= 3) index = 0
		if (index < 0) index = 2
		var translatex = -index * focusWidth
		ul.style.transition = 'none'
		ul.style.transform = 'translateX(' + translatex + 'px)'
	})

	//4.手指滑动轮播图
	var startX = 0
	var moveX = 0
	var flag = false
	//手指触摸屏幕
	ul.addEventListener('touchstart', function(e) {
		startX = e.targetTouches[0].pageX
		clearInterval(timer)
	})
	//移动手指
	ul.addEventListener('touchmove', function(e) {
		//手指移动距离
		moveX = e.targetTouches[0].pageX - startX
		//移动盒子  盒子原来的位置+手指移动的距离
		var translatex = -index * focusWidth + moveX
		//手指拖动一点点拖动
		ul.style.transition = 'none'
		ul.style.transform = 'translateX(' + translatex + 'px)'
		flag = true //如果移动为真
		e.preventDefault()
	})
	//手指离开
	ul.addEventListener('touchend', function(e) {
		if (flag == true) {
			//如果移动距离大于50px就播放上一张或者下一张
			if (Math.abs(moveX) > 50) {
				if (moveX > 0) {
					index--
				} else {
					index++
				}

				var translatex = -index * focusWidth
				ul.style.transition = 'all .3s'
				ul.style.transform = 'translateX(' + translatex + 'px)'
				if (index >= 3) index = 0
				if (index < 0) index = 2
				ol.querySelector('.current').classList.remove('current')
				ol.children[index % 3].classList.add('current')
			} else {
				//回弹
				var translatex = -index * focusWidth
				ul.style.transition = 'all .3s'
				ul.style.transform = 'translateX(' + translatex + 'px)'
			}
		}
		//开启动画
		clearInterval(timer)
		timer = setInterval(autoPlay, 2000)
	})

	//返回顶部模块
	var goback = document.querySelector('.goBack')
	var hotel_box = document.querySelector('.hotel_box')
	//监听页面滚动事件 看滚动到某个位置显示返回顶部
	window.addEventListener('scroll', function() {
		if (window.pageYOffset >= hotel_box.offsetTop) {
			goback.style.display = 'block'
		} else {
			goback.style.display = 'none'
		}
	})
	goback.addEventListener('click', function() {
		window.scroll(0, 0)
	})
})
