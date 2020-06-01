# react fiber

## 根本原因

+ 大量的同步计算阻塞浏览器的UI渲染。既js的大量运算占用了线程。

## 对比

<img src="https://p3.pstatp.com/origin/pgc-image/a71525bcc1f744cb8f3cf2e33b6bb5b9" />



<img src="https://p3.pstatp.com/origin/pgc-image/eeca92e871744389b9208a76b2881266" />

## 卡顿的原因

react中核心算法——reconciliation， 在渲染的过程中，父组件调用子组件，可以当作函数的递归。在setState的时候，react会立即开始reconciliation过程，从父节点（Virtual DOM）开始遍历，以找出不同。当dom树比较庞大的时候，reconciliation会长期占用主线程，造成交互、渲染、布局不能更新，给用户卡顿的感觉。


## Scheduler

scheduling(调度)是fiber reconciliation的一个过程。相当于调度中心，判断react当前应该先做什么。

在优化之前首先要考虑下面几个问题


- 并不是所有的state更新都需要立即显示出来，比如屏幕之外的部分的更新
- 并不是所有的更新优先级都是一样的，比如用户输入的响应优先级要比通过请求填充内容的响应优先级更高
- 理想情况下，对于某些高优先级的操作，应该是可以打断低优先级的操作执行的，比如用户输入时，页面的某个评论还在reconciliation，应该优先响应用户输入


## 任务拆分 fiber-tree & fiber

fiber在首次渲染的时候生成，它不仅包含了对应元素的基本信息，还要保存任务的调度信息，在后续的diff当中，会根据已有的树和Virtual DOM生成一颗新的树，这颗树没生成一个新的节点都会将控制权交给浏览器，去检查有没有更高优先级的任务执行。整个结构是一个链表树。

<img src="https://p3.pstatp.com/large/pgc-image/dfd941f94aef45a5973d9f153a64325b" />

```
fiber {
  	stateNode: {},
    child: {},
    return: {},
    sibling: {},
}
```

react还会维护一个workInProgressTree。workInProgressTree用于计算更新，完成reconciliation过程。

当前fiber节点的alternate属性指向workInProgress节点，对应workInProgress节点的alternate属性指向当前fiber节点。
上面alternate中说到镜像fiber tree就是workInProgress tree。
workInProgress tree上每个节点都有一个effect list，用来存放需要更新的内容。此节点更新完毕会向子节点或邻近节点合并 effect list


当调用setState后，react会把当前的更新送入list组件对应的update queue中。但是react并不会立即执行对比并修改DOM的操作。而是交给scheduler去处理。

scheduler会根据当前主线程的使用情况去处理这次update。为了实现这种特性，使用了requestIdelCallbackAPI。

- 低优先级任务由requestIdleCallback处理；
- 高优先级任务，如动画相关的由requestAnimationFrame处理；
- requestIdleCallback可以在多个空闲期调用空闲期回调，执行任务；
- requestIdleCallback方法提供deadline，即任务执行限制时间，以切分任务，避免长时间执行，阻塞UI渲染而导致掉帧；


任务的优先级

```javascript
{ 
    Synchronous: 1, // 同步任务，优先级最高
    Task: 2, // 当前调度正执行的任务
    Animation 3, // 动画
    High: 4, // 高优先级
    Low: 5, // 低优先级
    Offscreen: 6, // 当前屏幕外的更新，优先级最低
}
```



借鉴：https://juejin.im/post/5ab7b3a2f265da2378403e57
