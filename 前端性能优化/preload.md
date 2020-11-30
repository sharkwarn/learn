## preload 预加载

<hr>

<b>preload 让浏览器提前加载指定资源,加载后并不执行，在需要执行的时候再执行。</b>

#### 优势

- 将加载和执行分离开，可不阻塞渲染和 document 的 onload 事件。
- 提前加载指定资源。


<hr>

#### 用法

- css
```html
<!-- 使用 link 标签静态标记需要预加载的资源 -->
<link rel="preload" href="/index.css" as="style">

<!-- 也可以加载脚本 -->
<link rel="preload" href="/index.js" as="script">

<!-- 也可以加载字体 -->
<link rel="preload" href="/index.woff" as="script">

<!-- 也可以加载图片-->
<link rel="preload" href="/index.woff" as="image">

<!-- ... -->

```

- js

```js
var preloadLink = document.createElement("link");
preloadLink.href = "myscript.js";
preloadLink.rel = "preload";
preloadLink.as = "script";
document.head.appendChild(preloadLink);
```


- webpack 中应用

```js
import(/* webpackPrefetch: true */ 'LoginModal');

import(/* webpackPreload: true */ 'ChartingLibrary');
```

<hr>

#### 判断浏览器是否支持preload

```javascript
const isPreloadSupported = () => {
  const link = document.createElement('link');
  const relList = link.relList;

  if (!relList || !relList.supports) {
    return false;
  }

  return relList.supports('preload');
};
```


<hr>

#### 对比 prefetch

- preload  是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源，preload的优先级为highest
- prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。prefetch的优先级为lowest


<hr>

### 加载跨域资源时

加上 crossorigin 

```html
<link rel="preload" as="font" crossorigin href="./index.woff">
```


### 参考资料

- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content

