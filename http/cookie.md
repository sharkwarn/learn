## cookie 小知识


各浏览器之间对cookie的不同限制：

总之，在进行页面cookie操作的时候，应该尽量保证cookie个数小于20个，总大小 小于4KB

### node 设置cookie

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    if (request.url === '/script.js') {
        response.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
        response.end('console.log(2222)')
    } else {
        const file = fs.readFileSync('./index.html');
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['id=123; max-age=10', 'abc=456; domain=test.com; httpOnly=true; secure=true']// 所有二级域名都可以访问到cookie,httpOnly 不允许js读取, secure 只允许https访问
        })
        response.end(file);
    }
}).listen(9000, function(err) {
    if (err) {
        console.log(err)
    }
    console.log('服务创建成功');
});
```