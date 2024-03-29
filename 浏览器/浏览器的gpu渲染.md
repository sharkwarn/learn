<!--
 * @file: 
 * @Author: xxx@baidu.com
 * @Date: 2021-05-11 22:57:19
 * @Description: 
 * @FilePath: /mianshi/浏览器/浏览器的gpu渲染.md
-->

# 浏览器渲染原理

首先要明白一点， JavaScript 引擎是基于事件驱动单线程执行的，渲染线程负责浏览器的界面，gui 渲染线程与 js 引擎互斥。当 js 执行时 gui 会被挂起，gui 的更新会保存在一个队列中。等到js空闲时才有机会被执行。



当浏览器的 url 中输入内容，浏览器发起请求并拿回到请求的数据，返回的content-type 是 html， 开始解析文件。

### html 解析

解析 html 文件有两个主要步骤，

- 词法分析，将内容分成标记，构成内容的单位。
- 语法分析，将词法分析出来的内容，构建成解析树。

在解析的过程中会创建 document 对象。在树的构建阶段，以 document 为根节点的 dom 树会不断的进行修改，向其中添加各种元素。标记生成器发送的每一个节点都将有树构建器进行处理。


### css 解析

将 css 解析成对象 


### 整个过程

- 解析HTML，生成DOM树(DOM).
- 解析CSS，生成CSSOM树
- 将DOM和CSSOM合并，生成渲染树（Rendere-Tree）
- 计算渲染树的布局Layout
- 将布局渲染到屏幕上Paint


当浏览器获取HTML文件后，会自上而下加载并在加载过程中进行解析和渲染；加载就是获取资源的过程；如果在加载过程中遇到外部的css文件和图片，浏览器会另外发送一个请求，去获取css文件和图片，这个请求是异步的，并不会影响HTML文件的加载；但如果遇到JavaScript文件，HTML文件会挂起渲染的进程，等待JavaScript文件加载完毕后，再继续进行渲染。

为什么需要等待JavaScript呢？因为JavaScript可能会修改dom，导致后面的HTML资源白白加载，需要等待JavaScript文件加载完成后，再继续渲染，so，JavaScript文件一般写在底部body标签前的原因。


说说浏览器页面渲染：

第一步：在CSS资源还没有请求回来之前，先生成DOM树；

第二步：当所有的CSS请求回来之后，浏览器按照CSS的导入顺序，依次进行渲染，最后生成CSSOM树；

第三步：把DOM树和CSSOM树结合在一起，生成有样式，有结构的RENDER TREE渲染树；

最后一步：浏览器按照渲染树，在页面中进行渲染和解析


CSS加载会阻塞页面显示吗？

css加载不会阻塞DOM树的解析

css加载会阻塞DOM树的渲染

css加载会阻塞后面js语句的执行

so，为了避免让用户看到长时间的白屏时间，应该提高css的加载速度。

