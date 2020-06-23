开始事件: webkitAnimationStart
结束事件: webkitAnimationEnd
重复运动事件: webkitAnimationIteration


```javascript
var o = document.getElementById("div1");
// 动画开始时事件
o.addEventListener("webkitAnimationStart", function() {
    alert("动画开始");
})
// 动画重复运动时事件
o.addEventListener("webkitAnimationIteration", function() {
    alert("动画重复运动");
})
// 动画结束时事件
o.addEventListener("webkitAnimationEnd", function() {
    this.className = "";
    alert("动画结束");
})
```