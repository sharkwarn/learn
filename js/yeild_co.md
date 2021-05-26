<!--
 * @file: 
 * @Author: xxx@baidu.com
 * @Date: 2021-05-12 23:36:11
 * @Description: 
 * @FilePath: /mianshi/js/yeild_co.md
-->

# Generator 和 co 函数

#### 简单的例子

```js
function* a() {
    yield 1;
    yield 2;
    yield 3;
}
const res = a();

console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
```

#### next 可以传值

```js
function* a() {
    var a = yield 1;
    console.log('a', a);
    var b = yield 2;
    console.log('b', b);
    var c = yield 3;
    console.log('c', c);
}
const res = a();

res.next(3)
res.next(2)
res.next(1)
res.next()

// a 2, b 1, undefined
```

####  与 Iterator 接口的关系

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

```js
const obj = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
}

const arr = [...obj];

console.log(arr);

// [1, 2, 3]


function* gen(){
}

var g = gen();

g[Symbol.iterator]() === g
// true

```



通过 co 函数实现Generator的自执行

简单版

```js

function co(func) {
    const gen = func();
    function next(current) {
        const ret = gen.next(current.value)
        if (!ret.done) {
            next(ret)
        }
    }
    next(gen.next());
}

function* action() {
    const a = yield 1;
    console.log(a);
    const b = yield 2;
    console.log(b);
    const c = yield 3;
    console.log(c)
}

co(action);
```