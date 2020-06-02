## redux-thunk 和 redux-saga对比

 两者都是redux 异步 action 中间件，统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决。（把action抽离出来，有利于相同功能的action复用）。

redux中 中间件的处理流程。

<img src="https://p3.pstatp.com/origin/pgc-image/d1cc17e4cd2f4f13af39164f16935ce5" />


### redux-thunk 的解决方案
主要意思就是声明一个函数来代替表达式，这样就可以将执行求值操作（evaluation）延迟到所需要的时刻。

redux-thunk 的 action 可以是一 异步的 higher order function 高阶函数

### redux-saga 的解决方案

saga 使用的仍然是普通的 action，但是 saga 注册了相关 side effec。
saga 自己基本上完全弄了一套 asyc 的事件监听机制。虽然好的一方面是将来可以扩展成 worker 相关的模块，甚至可以做到 multiple threads 同时执行，但代码量大大增加。如果只是普通的 application，用 redux-thunk 足够。


thunk的话，相对比较简单。

