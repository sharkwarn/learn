## 简单对比

- 1.redux的理念是函数式编程，mobx的理念式面向对象。
- 2.数据上来说Redux理想的是immutable，每次都返回一个新的数据。mobx自始至终都是一份引用。因此redux式支持数据回溯的。
- 3.mobx可以做到精准更新，得益于Mobx的observable，redux用的是dispath广播，然后通过Provider和connect前后对比控制更新粒度，优化的需要写shouldComponentUpdate。mobx更精准。

## 优缺点对比

1. mobx相对来说比较简单，在其中有很多的抽象，mobx更多的使用面向对象的编程思维；redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用。
2. mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测；而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

### mobx 中的坑
1. 无法收集新增的属性
2. 回调函数若依赖外部环境，则无法进行收集

Mobx的核心原理是通过action触发state的变化，进而触发state的衍生对象（computed value & Reactions）

### 总结

因此，mobx不能保证用户提供的数据一定能 JSON序列化，或者能在有限的时间遍历完。所以它更应该被认为是一个数据流管理工具，能够让你以较小的代价构建自己的状态管理架构。能够快捷的再现有的项目中使用，而不需要进行大规模的重写。


借鉴

[https://zhuanlan.zhihu.com/p/36294638](https://zhuanlan.zhihu.com/p/36294638)

[https://blog.csdn.net/weixin_44369568/article/details/90713881](https://blog.csdn.net/weixin_44369568/article/details/90713881)



