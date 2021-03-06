
# 匿名函数调用自身

如果没有函数名，当函数需要引用自身时只能使用已经过期的arguments.callee引用，比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。

### 闭包所属的设计模式是模块模式

### 闭包的定义

当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包


# this

## this的绑定

### 默认绑定

+ 需要注意下，在严格模式下，this丢失的话，将会变为undefined， 非严格模式下为window。

### 隐式绑定

+ 这个比较重要注意下

```javascript
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}

obj.foo();
```

上面的例子说明this指向的是调用的对象。

如果是嵌套的对象，对象属性的引用链中只有上一层或者说最后一层起作用。

```javascript
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}
var obj2 = {
    a: 22,
    obj: obj
}

obj2.obj.foo();//2
```

+ 隐式的丢失

比较常见的一个问题，就是被隐式绑定的函数会丢失绑定的对象，也就是说函数应用了默认绑定，从而把this绑定到全局对象或者undefined上。

```javascript
var a = 'global';
var obj = {
    a:1,
    foo: function() {
        console.log(this.a);
    }
}

var bar = obj.foo;
bar();// global
```

虽然bar是obj.foo的一个引用，但实际上，它引用的是foo函数的本身，因此此时的bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

### 显示绑定


+ 比较常用apply、call
+ es6 当中Function.protorype.bind


### new绑定

javascript中的new操作符操作的函数，并不是一种特殊的函数类型，只是被new操作符调用的普通函数。

当new执行时会进行一下操作

+ 1. 创建一个全新的对象。
+ 2. 新对象会被执行prototype链接
+ 3. 这个新对象会绑定到函数调用的this。
+ 4. 如果函数没有返回其他对象，那么new表达式中的函数会自动返回这个对象。

按照上面这个逻辑我门自己实现下new

```javascript

function myNew(fn, ...arg) {
    const obj = new Object();
    obj.__proto__ = fn.prototype;
    fn.call(this, ...arg);
    return obj;
}
```