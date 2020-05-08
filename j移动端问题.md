## 

## 给移动端添加点击事件会有300S的延迟
如果用点击事件，需要引一个fastclick.js文件，解决300s的延迟
一般在移动端用ontouchstart、ontouchmove、ontouchend
移动端点透问题,touchstart 早于 touchend 早于click,click的触发是有延迟的，这个时间大概在300ms左右，也就是说我们tap触发之后蒙层隐藏， 此时 click还没有触发，300ms之后由于蒙层隐藏，我们的click触发到了下面的a链接上
尽量都使用touch事件来替换click事件。例如用touchend事件(推荐)。
用fastclick，github.com/ftlabs/fast…
用preventDefault阻止a标签的click
消除 IE10 里面的那个叉号
input:-ms-clear{display:none;}
设置缓存
手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置no-cache。



圆角BUG
某些Android手机圆角失效
background-clip: padding-box;
防止手机中网页放大和缩小
这点是最基本的，做为手机网站开发者来说应该都知道的，就是设置meta中的viewport