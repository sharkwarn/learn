
## 

监听任务和属性

```js
const observe = new MutationObserver(function(a) {
    console.log(a);
});
observe.observe(document.documentElement, {
    childList: true,
    attributeFilter: ['data-type'],
    subtree: true
});
setTimeout(() => {
    const dom = document.createElement('div');
    dom.id = 'container';
    document.documentElement.appendChild(dom);
    setTimeout(() => {
        dom.setAttribute('data-type', 'click');
        setTimeout(() => {
            dom.innerHTML = '<div data-type="click"></span></div>';
            dom.className = 'a';
        }, 2000);
    }, 2000);
}, 2000);
```


创建一个微任务
```js
const observe = new MutationObserver(function() {
    console.log(1);
});

observe.observe(document.documentElement, {
    childList: true,
    attributeFilter: ['data-type'],
    subtree: true
});
const dom = document.createElement('div');
document.documentElement.appendChild(dom);
```