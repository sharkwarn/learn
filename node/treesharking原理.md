


Tree-shaking的本质是消除无用的js代码。无用代码消除在广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE（dead code elimination）。


Dead Code 一般具有以下几个特征

- 代码不会被执行，不可到达

- 代码执行的结果不会被用到

- 代码只会影响死变量（只写不读）



## Tree-shaking的特点

tree-shaking的消除原理是依赖于ES6的模块特性。

ES6 module 的特点

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable的

ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。


rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉


- tree shaking 不支持动态导入（如CommonJS的require()语法），只支持纯静态的导入（ES6的import/export）
- webpack中可以在项目package.json文件中，添加一个 “sideEffects” 属性,手动指定由副作用的脚本
tree shaking 其实很好理解：一颗树，用力摇一摇，枯萎的叶子会掉落下来。剩下的叶子都是存活的



尽量不写带有副作用的代码。诸如编写了立即执行函数，在函数里又使用了外部变量等。
如果对ES6语义特性要求不是特别严格，可以开启babel的loose模式，这个要根据自身项目判断，如：是否真的要不可枚举class的属性。
如果是开发JavaScript库，请使用rollup。并且提供ES6 module的版本，入口文件地址设置到package.json的module字段。
如果JavaScript库开发中，难以避免的产生各种副作用代码，可以将功能函数或者组件，打包成单独的文件或目录，以便于用户可以通过目录去加载。如有条件，也可为自己的库开发单独的webpack-loader，便于用户按需加载。
如果是工程项目开发，对于依赖的组件，只能看组件提供者是否有对应上述3、4点的优化。对于自身的代码，除1、2两点外，对于项目有极致要求的话，可以先进行打包，最终再进行编译。
如果对项目非常有把握，可以通过uglify的一些编译配置，如：pure_getters: true，删除一些强制认为不会产生副作用的代码。
