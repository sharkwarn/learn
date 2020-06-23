

## hook 的性能优化

### React.memo


- 基本使用

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。


同时支持第二个参数是函数，用来代替shouldComponentUpdate
```javascript
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

### useMemo

官方解释： 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算；
需要注意下“创建函数”，目的是为了避免每次render的是时候都进行不必要的大量计算。

```javascript
const tree = useMemo(()=> {
    // 裁剪和聚合接口
    doSomeThing(props.tree)
}, [props.tree])
```

经过更改后，只有在props.tree发生改变的时候才会重新计算tree。


### useCallback

没看的太懂，主要还是解决重复声明吧。


因为重复声明一个是影响内存，另一个是影响后面对props变更的判断
