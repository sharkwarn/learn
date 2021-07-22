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


## 常问问题和解析

### diff 过程中被打断后是怎么重新开始的

答： 之前diff的过程是一个普通的递归，依赖调用栈，这种方式被打断后很难恢复，且不利于异步操作。

所以react对这个diff的数据结构进行改造。改造成一个链表。每个链表节点就是一个fiber单元，节点上也保存着，父节点、子节点、兄弟节点等信息。

浏览器执行diff完当前节点的信息后，先判断是否有剩余时间。如果有的话，继续diff下一个节点,如果没有的话，保存下一个节点。等浏览器有空余时间后，拿到这个节点继续上面的操作。



判断是否有剩余时间

```js
window.requestIdleCallback(function (e) {
    console.log(e.timeRemaining());
    while (true) {
        const timeEnd = e.timeRemaining();
        if (timeEnd <= 0) {
            // 没有预留时间了，记录下当前节点。退出任务
            break;
        } else {
            // 继续任务
        }
    }
    console.log(e.timeRemaining());
}, {
    timeout: 1000// 防止饿死，设置最长等待时间。
});
```

requestIdleCallback 只有chrome支持，所以它利用MessageChannel 模拟将回调延迟到'绘制操作'之后执行:



### 渲染的过程

每次渲染都分为两个阶段，Reconciliation(协调阶段) 和 Commit(提交阶段).

⚛️ 协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'副作用(Effect)' . 以下生命周期钩子会在协调阶段被调用

- constructor
- componentWillMount 废弃
- componentWillReceiveProps 废弃
- static getDerivedStateFromProps
- shouldComponentUpdate
- componentWillUpdate 废弃
- render

提交阶段: 将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。这个阶段必须同步执行，不能被打断. 这些生命周期钩子在提交阶段被执行:

- getSnapshotBeforeUpdate() 严格来说，这个是在进入 commit 阶段前调用
- componentDidMount
- componentDidUpdate
- componentWillUnmount

也就是说，在协调阶段如果时间片用完，React就会选择让出控制权。因为协调阶段执行的工作不会导致任何用户可见的变更，所以在这个阶段让出控制权不会有什么问题。
需要注意的是：因为协调阶段可能被中断、恢复，甚至重做，⚠️React 协调阶段的生命周期钩子可能会被调用多次!, 例如 componentWillMount 可能会被调用两次。
因此建议 协调阶段的生命周期钩子不要包含副作用. 索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如componentWillMount、componentWillUpdate. v17后我们就不能再用它们了, 所以现有的应用应该尽快迁移.



Reconciliation过程中会构建一颗新的树，官方称为workInProgress tree，WIP树),可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的旧树，React就是一边和旧树比对，一边构建WIP树的。 alternate 指向旧树的同等节点。对于需要变更的节点，都打上了'标签'。 在提交阶段，React 就会将这些打上标签的节点应用变更。


