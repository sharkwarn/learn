<!--
 * @file: 
 * @Author: xxx@baidu.com
 * @Date: 2021-05-11 23:04:50
 * @Description: 
 * @FilePath: /mianshi/js/Iterator.md
-->

# Iterator


#### 实现一个 Iterator

```js
// 实现一个 Iterator

function makeIterator(arr) {
    let i = 0;
    return {
        next: function() {
            return {
                value: arr[i++],
                done: arr.length < i
            };
        }
    };
}

const iterator = makeIterator([1, 2, 3]);
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

有些数据类型的原型上自带Iterator。

如： 

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象


```js
const arr = [1, 2, 3];

const a = arr[Symbol.iterator]();

console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());


const str = 'abc';

const strIter = str[Symbol.iterator]();

console.log(strIter.next());
console.log(strIter.next());
console.log(strIter.next());
console.log(strIter.next());


function demoArgIter() {
    const arg = arguments[Symbol.iterator]();
    console.log(arg.next());
    console.log(arg.next());
    console.log(arg.next());
    console.log(arg.next());
}

demoArgIter(1, 2, 3);
```


对象为什么不可以？

因为对象是无序的,本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。

#### for ... of

for ... of 循环的原理是Symbol.iterator 属性上生成可迭代的遍历器。

```js
const obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: function () {
        const that = this;
        const arr = [];
        for (let i in obj) {
            arr.push(i);
        }
        let k = 0;
        return {
            next: function () {
                return {
                    value: that[arr[k++]],
                    done: arr.length < k
                };
            }
        };
    }
}
for (let i of obj) {
    console.log(i);
}
```