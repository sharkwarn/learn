<!--
 * @file: 
 * @Author: xxx@baidu.com
 * @Date: 2021-07-07 20:56:14
 * @Description: 
 * @FilePath: /mianshi/mobile/webview和原生的通信.md
-->

## webview和原生的通信

### ios

#### h5 想ios发送消息

原理：ios可以拦截webview中所有的请求，所以我们可以约定在H5内发起特定协议的请求进行拦截,例如：jsbridge://bridge2.native?params=' + encodeURIComponent(obj)

发起请求协议的方式有两种

- 1. 通过localtion.href；缺点是native只能接受到最后一次。
- 2. 通过iframe

```js
// h5 js code 将它封装一下
function createIframe(url){
    var url = 'jsbridge://getShare?title=分享标题&desc=分享描述&link=http%3A%2F%2Fwww.douyu.com&cbName=jsCallClientBack';
    var iframe = document.createElement('iframe');
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.display = 'none';
    iframe.src = https://segmentfault.com/a/url;
    document.body.appendChild(iframe);
    setTimeout(function() {
        iframe.remove();
    }, 100);
}
```

#### ios想h5发送消息

原理： native可以调用JavaScript的语音。通过UIWebView组件的stringByEvaluatingJavaScriptFromString方法来实现的，该方法返回js脚本的执行结果。

```
webview.stringByEvaluatingJavaScriptFromString("window.methodName()")
```


### 安卓

#### 方法1.

和ios一样通过iframe进行通信


#### 方法2

安卓给window注入了原生的对象AndroidNativeApi。


#### 安卓调用h5的方法

```
webView.loadUrl("javascript:window.jsBridge.getShare()");
```
H5端将方法绑定在window下的对象即可，无需与IOS作区分


### RN


#### H5调用RN客户端

postMessage、onMessage来传递消息即可，类似于iframe，而真正的通信过程RN已经帮我们做了。
