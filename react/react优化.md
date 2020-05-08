# react 优化

核心思想，当组件的props和state没有发生变化时，不需要更新组件。

## shouldComponentUpdate


## PuerComponent

这个方法会自动浅比较一层props和state，所以针对这个情况，如果要改一个深层次的对象，都是会新实例一个。

## immutable.js

Immutable.js是解决这个问题的另一种方法。它通过结构共享提供不可突变的，持久的集合