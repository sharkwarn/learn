## MutationObserver的使用

```javascript
const observer = new MutationObserver(function (mutations, observer) {
    console.log(mutations);//[{type: 'childList',.....}]
})
observer.observe(root, {
    childList: true,
    subtree: true
})
const p = Promise.resolve();
root.appendChild(document.createElement('div')); 
// DOM操作执行完成，触发观察回调
p.then(() => {
    console.log('d')
})
```


## 用css实现乱七八糟的东西

### 菱形

本质还是正方形旋转
正数为顺时针，负数为逆时针

```css
display: inline-block;
width:100px;
height:100px;
background-color: #c685d9;
transform: rotate(45deg);
margin:50px;
```


### 三角形

```css
width: 0;
height:0;
border-bottom: 100px solid #ffcccc;
border-right:50px solid transparent;
border-left:50px solid transparent;
```


### 梯形

与三角形同理，只不过有宽度或者长度
```css
 margin-top:50px;
height: 0;
width: 120px;
border-bottom: 120px solid #cccccc;
border-left: 60px solid transparent;
border-right: 60px solid transparent;
```

### 平行四边形
transform: skew(ax, ay) 以某一轴倾斜 可以结合旋转做任意的菱形
```css
margin-top:50px;
margin-left:50px;
width:160px;
height:100px;
background-color: beige;
transform: skew(-30deg);
```

