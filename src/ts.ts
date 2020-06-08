// 定义普通类型。

const a: string = '1';
const b: string | number = 1;

// Array

const list1: number[] = [1, 3, 4];
const list2: Array<number> = [1];


//元组 Tuple
//元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
const list3: [string, number] = ['1', 2];



// 枚举 enum

enum Color { Red = 1, Green, Blue };


// any
// 🈯️任意类型
// 相比较Object类型，Object类型值允许许复制不可以调用任意方法。

const obj: any = { a: 1 };
obj.a.toString()

const obj2: Object = { a: 1 };
// obj2.a.toString()// Error

// void
// 与any相反，表示没有任何类型。
function func(): void {
  console.log(111);
}

// Null & Undefined
// 默认情况下是所有类型的子类型

const nul1: null = null;
const nul2: number = null;


// Never表示永远不存在的类型
// 1. throw new Error('12345')

// while(true){}


// 定义全局的变量
const my: MyType = {
  foo: '111',
  bar: ['111']
}

const my2: MyType2 = {
  foo: '111',
  bar: ['111']
}




//类型断言 
// 表示的意思，虽然之前声明了这个值的类型，但是可以确定这个值类型是另一种。

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

let strLength2: number = (someValue as string).length;



// ## 接口

interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 可选属性

interface Obj {
  width?: number,
  height?: number
}

// 只读属性
interface Read {
  readonly size: number
}

// 只读属性用来描述数组（ReadonlyArray<T>），会把操作数组的方法都去掉，确保创建后的数组再也不能被修改
let readonly1: number[] = [1, 2, 3, 4];
let readonly2: ReadonlyArray<number> = readonly1;
//ro[0] = 12; // error!
//ro.push(5); // error!
//ro.length = 100; // error!
//a = ro; // error!

// 如果把ReadonlyArray<T>变成普通的数组
readonly2 as number[];

// 函数类型

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}


// 可索引的类型, 注意索引类型的值是只读的。

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 类类型
interface Parent {
  value: number;
}

class Child implements Parent {
  value: 1;
  label: 'string'
}

// 类类型，实例时检查

// interface ClockConstructor {
//   new (hour: number, minuter: number): void;    // 定义构造函数的接口
// };

// class clock implements ClockConstructor {
//   currenTime: Date;
//   constructor(h:number, m:number){    // 接口限制的是此构造函数

//   }
// }

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// 继承接口

interface Parent1 {
  value: number
}
interface Parent1_2 {
  key: string
}

interface Child1 extends Parent1 {
  label: string
}

const obj3: Child1 = {
  value: 1,
  label: '2'
}
// 换一种方式

const obj4 = <Child1>{};
obj4.value = 1;
obj4.label = '1'

// 继承多个

interface Child1_2 extends Parent1, Parent1_2 {
  label: string
}

// 混合属性

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}


// 接口继承类


class Control {
  private state: any;
}

// 这个地方代表的意思是，属性必须要继承Control
interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

class Image2_Parent {
  private state: any;
}

// 这个地方只能继承与Control，不可以自己设置（自己这样认为）
class Image2 extends Control implements SelectableControl {
  select() { }
}


// ## 类

// 简单的例子

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 继承和js一样。


//公共，私有与受保护的修饰符 
// ts都默认为 public

class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// 私有
class Animal2 {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

// new Animal2("Cat").name; // 错误: 'name' 是私有的.

class Child_Animal2 extends Animal2 {
  type: string;
  constructor() {
    super('props');
    // this.type = this.name;// error 在自类型中依然不可以访问父类中的私有属性
  }
}

// protected 在派生类中仍然可以访问。
// 例如
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Boy extends Person {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
}

// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
class Person2 {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}


//readonly修饰符
// 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
  change(str: string): void {
    //this.name = str;// 也是错的，只有在constructor里面才可以被声明。
  }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.


//存取器

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    this._fullName = newName;
  }
}

// 只带有 get不带有 set的存取器自动被推断为 readonly

// 静态属性

class Grid {
  static origin = { x: 0, y: 0 };
}



// 抽象类
abstract class Animal3 {
  abstract makeSound(): void;// 子类中必须声明该函数
  move(): void {
    console.log('roaming the earch...');
  }
}

class Animal4 extends Animal3 {
  makeSound() { }
}

//把类当做接口使用

class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}
let point3d: Point3d = { x: 1, y: 2, z: 3 };


// 函数

// 重载
//  JavaScript里函数根据传入不同的参数而返回不同类型的数据
function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
// 下面这个x提示错误，不知道原因
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return {};
  }
}


// ##泛型
// 主要为了考虑可重用性

// 例如一个方法
function identity(x: number): number {
  return x + 1;
}
function identity2(x: string): string {
  return x + 1;
}

// 使用any的话会使这个参数可以接收任何类型的参数。
// 泛型上场

function identity3<T>(x: T): T {
  return x;
}

let output = identity3<number>(2);
// 不制定类型则根据参数自行判断。
let output2 = identity3(2);

// 使用泛型变量
// 如果没有制定T的类型，所以也不能使用T的方法。

function identity4<T>(x: T[]): T[] {
  console.log(x.length);
  return x;
}

function identity5<T>(x: Array<T>): T[] {
  console.log(x.length);
  return x;
}

// 泛型类型

function identity6<T>(arg: T): T {
  return arg;
}

// 中间的那个区域显示的函数的
let myIdentity: <T>(arg: T) => T = identity6;

//根据上面的例子写出泛型的接口

interface func {
  <T>(arg: T): T
}

function func1<T> (x: T): T {
  return x;
}

const funca: func = func1;

// 或者
interface func2<T> {
  (arg: T): T
}

//们的示例做了少许改动。 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。 当我们使用 GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。 对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。
const funcB: func2<number> = func1;


// 泛型类

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };


new GenericNumber<number>();


// 泛型约束

interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}


//现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
// loggingIdentity(3);  // Error,

// 在泛型里使用类类型
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal7 {
  numLegs: number;
}

class Bee extends Animal7 {
  keeper: BeeKeeper;
}

class Lion extends Animal7 {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal7>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!


// 高级类型

// 交叉类型（Intersection Types）交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
  }
  return result;
}

// 联合类型（Union Types）联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数。 例如下面的函数：

function padLeft(value: string, padding: string | number) {
  // ...
}

// 联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。

interface Bird {
  // fly();
  // layEggs();
}

interface Fish {
  // swim();
  // layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
  return {
    // swim();
    // layEggs();
  }
}


// 类型保护与区分类型

// 用断言保护
// let pet = getSmallPet();

// if ((<Fish>pet).swim) {
//     (<Fish>pet).swim();
// }
// else {
//     (<Bird>pet).fly();
// }
// 用户自定义的类型保护
// function isFish(pet: Fish | Bird): pet is Fish {
//   return (<Fish>pet).swim !== undefined;
// }
// pet is Fish就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。



// 类型别名 type

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}

// type定义泛型
type Container<T> = { value: T };

// 也可以使用类型别名来在属性里引用自己：
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}

// 与交叉类型一起使用
// type LinkedList<T> = T & { next: LinkedList<T> };

// interface Person {
//     name: string;
// }

// var people: LinkedList<Person>;
