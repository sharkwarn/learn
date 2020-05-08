## webpack 基本配置
```
module.exports={
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}

```


## 生成chunk的地方的配置

+ code-spliting import或者require.enuse模块

+ runtime chunk（）它的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。

+ splitChunks webpack4替代CommonsChunkPlugin的插件，支持设置

    + 可以共享新块，或者模块来自node_modules文件夹
    + 新的块将大于30kb（在min + gz之前）
    + 按需加载块时并行请求的最大数量将小于或等于6
    + 初始页面加载时并行请求的最大数量将小于或等于4

+ CommonsChunkPlugin 通过将常用模块与捆绑包分开，可以将生成的分块文件最初加载一次，并存储在缓存中以备后用。这会导致页面速度优化，因为浏览器可以快速从缓存中提供共享代码，而不是每次访问新页面时都被迫加载更大的包。




## webpack 常用插件

### 单独打包第三方插件

+ 单独打包第三方插件。
    + DllPlugin
    + DllReferencePlugin
+ 打包公共模块
    + commonChunkPlugin、splitChunks、runtime chunk
+ HtmlWebpackPlugin

+ babel
    + 1. 解析es6 语法肯定要用到babel-loader
    + 2. 解析语法的核心库——babel-core
    + 3. @babel/preset-env 将语法解析成浏览器支持的
    + 4. babel-polyfill 有些方法浏览器可能不兼容。
    + 5. @babel/perset-react
+ UglifyJSPlugin
    + 混淆
    + 美化
    + 压缩
