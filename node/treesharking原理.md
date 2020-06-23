


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