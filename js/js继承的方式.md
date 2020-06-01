

## 1. 原型链继承

```javascript
function Person(name) {
    this.name = name;
    return this;
}
Person.prototype.type = 'man';

const a = new Person('a');
console.log(a);// {name: "a"}
const b = new Person('b');
b.type = 'woman';
console.log(b);// {name: "b", type: "woman"}
console.log(a);// {name: "a"}
```

### 优点：

- 简单易于实现，父类的新增的实例与属性子类都能访问

### 缺点：

- 1.原型链上的属性，被所有的示例共享。
- 2.创建的过程中不能想构造函数传递参数。

## 2.借用构造函数

```javascript
function Parent(name, type) {
    this.name = name;
    this.type = type;
    this.colors = ['red', 'green', 'black'];
}

function Child() {
    Parent.apply(this, arguments);
    this.owner = true;
}

const a = new Child('a', '1');
console.log(a);

const b = new Child('b', '2');
console.log(b);
```

### 优点

- 解决了子类构造函数向父类构造函数中传递参数
- 可以实现多继承（call或者apply多个父类）

### 缺点

- 方法都需要在构造函数中定义，无法进行函数复用。
- 不能继承父类的原型，只能继承父类的属性。

## 3.组合继承 （伪经典继承）

```javascript
function Parent(name, type) {
    this.name = name;
    this.type = type;
    this.colors = ['red', 'green', 'black'];
}

Parent.prototype.say = function() {
    console.log(this.name + ':' + this.colors.toString());
}

function Child() {
    // 继承属性；
    Parent.apply(this, arguments);
    this.owner = true;
}
// 继承方法，主要是原型上的方法。
Child.prototype = new Parent();
Child.prototype.constructor = Child;

Child.prototype.consoleColors = function() {
    console.log(this.colors);
}

const a = new Child('a', '1');
console.log(a);
/* {
    colors: (3) ["red", "green", "black"]
    name: "a"
    owner: true
    type: "1",
    __prpto__: {
        colors: (3) ["red", "green", "black"]
        consoleColors: ƒ ()
        constructor: ƒ Child()
        name: undefined
        type: undefined
    }
}
*/

a.consoleColors();// ["red", "green", "black"]
a.say();// a:red,green,black
```

### 缺点
- 1.由于调用了两次父类，所以产生了两份实例

### 优点

- 1.函数可以复用
- 2.不存在引用属性问题
- 3.可以继承属性和方法，并且可以继承原型的属性和方法


## 4.原型式继承

#### 思路：借助原型可以基于已有的对象创建新的示例，同时还不必因此创建自定义类型。

```javascript
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
```
上面的方法其实就是Object.create 的实现方式。


## 寄生式继承

```javascript
function Parent(type) {
    this.type = type;
}
Parent.prototype.eat = function() {
    console.log('eat');
}

function Child(name, type) {
    // 继承属性
    Parent.call(this, type);
    this.name = name;
}

// 继承方法
Child.prototype = new Parent();
Child.prototype.constructor = Child;
const a = new Child('a', 1);
```
完美的继承


## class
简单易懂

