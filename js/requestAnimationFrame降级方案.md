<!--
 * @file: 
 * @Author: xxx@baidu.com
 * @Date: 2021-07-26 20:48:12
 * @Description: 
 * @FilePath: /mianshi/js/requestAnimationFrame降级方案.md
-->


```js
(function () {
	var lastTime = 0
	var vendors = ['ms', 'moz', 'webkit', 'o']
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime()
			var timeToCall = Math.max(0, 16 - (currTime - lastTime))
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall)
			}, timeToCall)
			lastTime = currTime + timeToCall
			return id
		}

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id)
		}
})();
```