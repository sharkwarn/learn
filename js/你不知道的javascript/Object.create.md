
# Object.create 函数


+ Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

例如

```javascript
var a = {a: 1};
var b = Object.create(a);
b.__proto__ === a;// true
//注意直接是引用的相等
// 如果这样
b.__proto__.a = 2;
console.log(a.a);// 2

var c = Object.create(null);
//
```

+ Object.create(null)
1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候； 没有__proto__是一个纯净的对象。
2. 想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

### Object.create 第二个参数

```javascript
var anotherObj = {
    a: 1
}
var obj = Object.create(anotherObj, {
    b: {
        enumberable: false,
        writable: false,
        configurable: false,
        value: 2
    },
    c: {
        enumberable: true,
        writable: false,
        configurable: false,
        value: 3
    }
})
obj.hasOwnProperty('a');// false
obj.hasOwnProperty('b');// true
obj.hasOwnProperty('c');// true
obj.a;//1
obj.b;//2
obj.c;//3
```

```javascript
var a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a,'toString')){
    ...
}
//为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}
```
<a href="https://juejin.im/post/5acd8ced6fb9a028d444ee4e" target="_blank">引用</a>

### Object.create 的实现
```javascript
if (!Object.create) {
    Object.create = function(o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
}
```
