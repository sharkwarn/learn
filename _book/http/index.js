const http = require('http');
const fs = require('fs');


http.createServer(function(request, response) {
    if (request.url === '/script.js') {
        response.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'max-age=1000, public' // 可设置多个值，以后面设置生效
        });
        response.end('console.log(2222)')
    } else {
        const file = fs.readFileSync('./index.html');
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Header': 'X-Test', // 自定义请求头
            'Access-Control-Allow-Methods': 'POST,PUT', // 自定义请求头
            'Access-Control-Max-Age': '1000' //  1000s之内不需要重新发起预检请求
        })
        response.end(file);
    }
    
}).listen(9000, function(err) {
    if (err) {
        console.log(err)
    }
    console.log('服务创建成功');
});