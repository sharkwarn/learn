# es新增语法

## 2018

- Rest/Spread 属性

```javascript
const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 3
}
const {a, b, ...c} = obj;
```

- 异步迭代
  
for... of 循环中使用await关键字

```javascript
for await (const line of readlines(path)) {
    console.log(line)
}

```


- Promise.prototype.finally()
  
```javascript
fetch(url)
.then(res => result)
.catch(err => err)
.finally(() => {

})
```

- 正则相关

## 2019

- String.prototype.trimStart() / String.prototype.trimEnd()

去掉头部或者尾部的空格

- Object.fromEntries()
  
Object.entries把一个对象转为[key, value]键值对的形式，可以运用于像 Map 这种结构中。凡事有来有回，Object.fromEntries()用于把键值对还原成对象结构。

```javascript
const entries = [ ['foo', 'bar'] ];
const object = Object.fromEntries(entries);
// { foo: 'bar' }
```

- Array.prototype.flat() / Array.prototype.flatMap()
  
可以传递一个数组深度的参数
```javascript
[1, 2, [3, 4]].flat();
// [ 1, 2, 3, 4 ]
[1, 2, [3, 4, [5, 6]]].flat(2);
// [ 1, 2, 3, 4, 5, 6 ]
```

- catch 的参数改为可选

之前catch的参数是必填，不选择就会出现报错。

- Symbol.description

Symbol是ES6中引入的基本数据类型，可以用作对象属性的标识符。描述属性是只读的，可用于获取符号对象的描述，更好了解它的作用。

```javascript
const symbol = Symbol('This is a Symbol');
symbol;
// Symbol(This is a Symbol)
Symbol.description;
// 'This is a Symbol'

```

- JSON Superset 超集
  
之前如果JSON字符串中包含有行分隔符(\u2028) 和段落分隔符(\u2029)，那么在解析过程中会报错。

```javascript
JSON.parse('"\u2028"');
// SyntaxError
```

- Array.prototype.sort() 更加稳定

- Function.prototype.toString() 重新修订
  
从ES2019开始，Function.prototype.toString()将从头到尾返回源代码中的实际文本片段。这意味着还将返回注释、空格和语法详细信息。

```javascript
function /* a comment */ foo() {}
```


## 2020

- 私有变量
  
```javascript
class Message {
 #message = "Howdy"

 greet() { console.log(this.#message) }
}

const greeting = new Message()

greeting.greet() // Howdy
console.log(greeting.#message) // Private name #message is not defined
```

- Promise.allSettled

通过Promise.allSettled，我们可以创建一个新的Promise，它只在所有传递给它的Promise都完成时返回一个数组，其中包含每个Promise的数据。

包含返回的状态
```javascript
const p1 = new Promise((res, rej) => setTimeout(res, 1000));

const p2 = new Promise((res, rej) => setTimeout(rej, 1000));

Promise.allSettled([p1, p2]).then(data => console.log(data));

// [
//   Object { status: "fulfilled", value: undefined},
//   Object { status: "rejected", reason: undefined}
// ]

```


- 合并空运算符

```javascript
let person = {
  profile: {
    name: "",
    age: 0
  }
};

console.log(person.profile.name || "Anonymous"); // Anonymous
console.log(person.profile.age || 18); // 18

console.log(person.profile.name ?? "Anonymous"); // ""
console.log(person.profile.age ?? 18); // 0
```

- 可选的链接操作

```javascript
let person = {};

console.log(person.profile.name ?? "Anonymous"); // person.profile is undefined
console.log(person?.profile?.name ?? "Anonymous");
console.log(person?.profile?.age ?? 18);
```


- BigInt


JavaScript可以处理的最大数字是2 ^ 53，我们可以在MAX_SAFE_INTEGER中看到

```javascript
const max = Number.MAX_SAFE_INTEGER;

console.log(max); // 9007199254740991

// 超过这个数字就会变得有点奇怪
console.log(max + 1); // 9007199254740992
console.log(max + 2); // 9007199254740992
console.log(max + 3); // 9007199254740994
console.log(Math.pow(2, 53) == Math.pow(2, 53) + 1); // true
```


我们可以使用新的 BigInt数据类型来解决这个问题。通过把字母n放在末尾，我们可以与大得离谱的数字进行交互。我们无法将标准数字与BigInt数字混合在一起，因此任何数学运算都需要使用BigInt来完成。

```javascript
const bigNum = 100000000000000000000000000000n;

console.log(bigNum * 2n); // 200000000000000000000000000000n
```


- 动态引入
  

如果您有一个写满实用程序功能的文件，而且其中某些功能可能很少使用，那么导入其所有依赖项可能只是浪费资源。 现在，我们可以使用async / await在需要时动态导入依赖项。

a.
```javascript
const add = (num1, num2) => num1 + num2;

export { add };
```

b.
```javascript
const doMath = async (num1, num2) => {
  if (num1 && num2) {
    const math = await import('./math.js');
    console.log(math.add(5, 10));
  };
};

doMath(4, 2);
```