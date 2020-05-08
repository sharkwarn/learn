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
            'Set-Cookie': ['id=123; max-age=10', 'abc=456; domain=test.com']// 所有二级域名都可以访问到cookie
        })
        response.end(file);
    }
    
}).listen(9000, function(err) {
    if (err) {
        console.log(err)
    }
    console.log('服务创建成功');
});