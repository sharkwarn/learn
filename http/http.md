基本概念：

HTTP，全称为 HyperText Transfer Protocol，即为超文本传输协议。是互联网应用最为广泛的一种网络协议
所有的 www 文件都必须遵守这个标准。

http特性：

HTTP 是无连接无状态的
HTTP 一般构建于 TCP/IP 协议之上，默认端口号是 80
HTTP 可以分为两个部分，即请求和响应。

http请求：

HTTP 定义了在与服务器交互的不同方式，最常用的方法有 4 种
分别是 GET，POST，PUT， DELETE。URL 全称为资源描述符，可以这么认为：一个 URL 地址
对应着一个网络上的资源，而 HTTP 中的 GET，POST，PUT，DELETE 
就对应着对这个资源的查询，修改，增添，删除4个操作。

HTTP 请求由 3 个部分构成，分别是：状态行，请求头(Request Header)，请求正文。

HTTP 响应由 3 个部分构成，分别是：状态行，响应头(Response Header)，响应正文。

HTTP 响应中包含一个状态码，用来表示服务器对客户端响应的结果。
状态码一般由3位构成：

1xx : 表示请求已经接受了，继续处理。
2xx : 表示请求已经处理掉了。
3xx : 重定向。
4xx : 一般表示客户端有错误，请求无法实现。
5xx : 一般为服务器端的错误。

比如常见的状态码：

200 OK 客户端请求成功。

301 Moved Permanently 请求永久重定向。

302 Moved Temporarily 请求临时重定向。

304 Not Modified 文件未修改，可以直接使用缓存的文件。

307 临时重定向

400 Bad Request 由于客户端请求有语法错误，不能被服务器所理解。

401 Unauthorized 请求未经授权，无法访问。

403 Forbidden 服务器收到请求，但是拒绝提供服务。服务器通常会在响应正文中给出不提供服务的原因。

404 Not Found 请求的资源不存在，比如输入了错误的URL。

500 Internal Server Error 服务器发生不可预期的错误，导致无法完成客户端的请求。

503 Service Unavailable 服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常。

## 陈述输入URL回车后的过程

1.读取缓存： 
        搜索自身的 DNS 缓存。(如果 DNS 缓存中找到IP 地址就跳过了接下来查找 IP 地址步骤，直接访问该 IP 地址。)

2.DNS 解析:将域名解析成 IP 地址

3.TCP 连接：TCP 三次握手，简易描述三次握手

           客户端：服务端你在么？ 

           服务端：客户端我在，你要连接我么？ 

           客户端：是的服务端，我要链接。 

           连接打通，可以开始请求来

4.发送 HTTP 请求

5.服务器处理请求并返回 HTTP 报文

6.浏览器解析渲染页面

7.断开连接：TCP 四次挥手

关于第六步浏览器解析渲染页面又可以聊聊如果返回的是html页面

根据 HTML 解析出 DOM 树

根据 CSS 解析生成 CSS 规则树

结合 DOM 树和 CSS 规则树，生成渲染树

根据渲染树计算每一个节点的信息

根据计算好的信息绘制页面

第二个版本

1、浏览器的地址栏输入URL并按下回车。

2、浏览器查找当前URL是否存在缓存，并比较缓存是否过期。3、DNS解析URL对应的IP。

4、根据IP建立TCP连接（三次握手）。

5、HTTP发起请求。

6、服务器处理请求，浏览器接收HTTP响应。

7、渲染页面，构建DOM树。

8、关闭TCP连接（四次挥手




## 跨域方式
原因： 同源策略（协议+端口号+域名要相同）

+ 1、jsonp跨域(只能解决get） 原理：动态创建一个script标签。利用script标签的src属性不受同源策略限制，因为所有的src属性和href属性都不受同源策略的限制，可以请求第三方服务器资源内容

+ 2、document.domain 基础域名相同 子域名不同

+ 3、 window.name 利用在一个浏览器窗口内，载入所有的域名都是共享一个window.name

+ 4、服务器设置对CORS的支持 原理：服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求

+ 5、利用h5新特性window.postMessage()


## ajax 原生的方式

+ 1.创建ajax实例
+ 2.执行open 确定要访问的链接 以及同步异步
+ 3.监听请求状态
+ 4.发送请求


## 三次握手

第一次握手：客户端发送一个SYN码给服务器，要求建立数据连接；

第二次握手： 服务器SYN和自己处理一个SYN（标志）；叫SYN+ACK（确认包）；发送给客户端，可以建立连接

第三次握手： 客户端再次发送ACK向服务器，服务器验证ACK没有问题，则建立起连接；


## 四次挥手

第一次挥手： 客户端发送FIN(结束)报文，通知服务器数据已经传输完毕；

第二次挥手: 服务器接收到之后，通知客户端我收到了SYN,发送ACK(确认)给客户端，数据还没有传输完成

第三次挥手： 服务器已经传输完毕，再次发送FIN通知客户端，数据已经传输完毕

第四次挥手： 客户端再次发送ACK,进入TIME_WAIT状态；服务器和客户端关闭连接；



## http 协议

长连接：HTTP1.0需要使用keep-alive参数来告知服务器建立一个长连接，而HTP1.1默认支持长连接
节约宽带：HTTP1.1支持只发送一个header信息（不带任何body信息）
host域（设置虚拟站点，也就是说，web server上的多个虚拟站点可以共享同一个ip端口）：HTTP1.0没有host域

1.http2采用的二进制文本传输数据，而非http1文本格式，二进制在协议的解析和扩展更好

2.数据压缩：对信息头采用了HPACK进行压缩传输，节省了信息头带来的网络流量

3.多路复用：一个连接可以并发处理多个请求

4.服务器推送：我们对支持HTTP2.0的web server请求数据的时候，服务器会顺便把一些客户端需要的资源一起推送



## 浏览器渲染原理及流程 DOM -> CSSOM -> render -> layout -> print




## http 预请求

### 允许方法

+ get
+ head
+ post

### 允许content-type

+ text/plain
+ multipart/form-data
+ application/x-www-form-urlencoded

### 请求头限制



 ## Cookie 和 Session

 max-age & expires(需要设置一个具体时间) 设置过期时间

 Secure只在https的时候发送

 HttpOnly无法通过document.cookie 访问

 cookie的最大限制
    
+ 绝大多数浏览器都是每个域名的cookie数限制为50个
+ cookie的总大小不超过4097个字节


 #### 设计知识点

+ csrf攻击



## http长链接

### Connection: keep-alive & close

tcp最大请求数是6个



## 数据协商

客户端在请求的时候会表明自己想要得到一个什么样的数据格式，服务器根据客户端的要求进行返回

### 分类

#### 请求

+ Accept // 指定我想要的数据类型
    + Content-Type
+ Accept-Encoding // 代表这个数据是一个什么样的编码，压缩方式
    + Content-Encoding node gzip 方法是通过node包glip方式glip.gzip('string')
+ Accept-Language // 返回语言
    + Content-Language
+ Accept-Agent // 


#### 发送请求是的Content-Type

+ 通过设置form中enctype
    + appliction/x-www-form-urlencoded 通过拼接字符串例如get请求
    + multipart/form-data 表单分部分，因为可能会包含文件，上传的时候Content-Type：mutipart/form-data + --webkit+string （通过后面这个字符串分隔表单内容）

## 重定向

```
response.writeHead(302, {
    Location: '/new'
})
```

+ 302 临时重定向
+ 301 永久重定向 // 下次访问不需要请求服务器，直接在客户端进行判断跳转到指向地址,直接通过缓存


## Content-Security-Policy  内容安全策略

### 作用
+ 限制资源获取
+ 报告资源获取越权

### 限制方式

+ default-src
    + connect-src
    + img-src
    + style-src
    + script-src
    + ... 和链接有关的资源

+ 特定的资源类型

```
'Content-Security-Policy': 'default-src http: https:'
'Content-Security-Policy': 'default-src \'self\'' // 限制只能加载本域的js脚本

'Content-Security-Policy': 'default-src \'self\' https://cdn.jquery.com' // 限制只能加载本域的js脚本 指定域名下的脚本
'Content-Security-Policy': 'default-src \'self\'; form-action \'self\'' // 限制表单只能提交到本站
'Content-Security-Policy': 'script-src \'self\'; form-action \'self\'' // 仅限制script
'Content-Security-Policy': 'script-src \'self\'; form-action \'self\'; reportbuzhichi-uri /report' // 报错发送报告

// 或者通过meta标签, 不支持设置report-uri
<meta http-equiv="Content-Security-Policy" content="script-src \'self\'; form-action \'self\'; reportbuzhichi-uri /report">
```





## nginx

### Vary
设置nginx代理服务器如果请求头上标识符进行缓存
```
response.writeHeader({
    Vary: 'x-test-cache'
})

fetch(url, {
    headers: {
        'x-test-cache': 11
    }
})
```


## https

### 加密

+ 私钥
+ 公钥

### https 的握手过程

1、 https在http的基础上加上了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器与服务器之间的通信加密。

2、 客户端请求建立链接，发送支持的加密方式以及一个随机数client random给服务器。

3、 服务器选择其中一种加密方式，并在加上一个随机数sever random，和数字证书（其中公钥），发送给客户端。

4、 客户端确认这个数字证书是有效的，并且生成一个新的随机数，用服务器返回的数字证书中的公钥加密这个数字发送给服务器。

5、 服务器收到客户端的回复，利用自己的私钥进行解密，获取到这个随机数，然后通过将前面的三个随机数以及他们协商的加密方式，计算成一个对称密钥。



## 用nginx配置https

需要生成一个证书

```
```



## http2

前提在https的情况下


### 信道复用 

只需要创建一个tcp链接

### 分帧传输

### Server Push

## http3

+ quic 协议
+ 解决丢包引起的性能问题，因为http2的分帧传输，一帧里面包含多个信息，所以要出现丢包的情况下，会造成所以的请求都必须等待处理。
