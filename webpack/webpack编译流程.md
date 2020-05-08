# webpack编译流程


## 第一种解释

1：初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；


2：开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

3：确定入口：根据配置中的 entry 找出所有的入口文件

4：编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

5：完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；


6：输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

7： 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。



## 第二种解释

1.webpack.config.js,shell options参数解析

2.new webpack(options)

3.run() 编译的入口方法

4.compile() 出发make事件

5.addEntry() 找到js文件，进行下一步模块绑定

6._addModuleChain() 解析js入口文件，创建模块

7.buildModule() 编译模块，loader处理与acorn处理AST语法树

8.seal() 每一个chunk对应一个入口文件

9.createChunkAssets() 生成资源文件

10.MainTemplate.render() __webpack__require()引入

11.ModuleTemplate.render() 生成模版

12.module.source() 将生成好的js保存在compilation.assets中

13.Compiler.emitAssets()通过emitAssets将最终的js输出到output的path中


## 插件

再整个的编译过程当中，webpack提供了各个阶段的钩子函数，我们通过这些钩子函数开个插件。

compilation.hooks.someHook.tap(...)