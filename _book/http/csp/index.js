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
            //'Content-Security-Policy': 'default-src http: https:'
            // 'Content-Security-Policy': 'default-src \'self\'' // 限制只能加载本域的js脚本

            // 'Content-Security-Policy': 'default-src \'self\' https://cdn.jquery.com' // 限制只能加载本域的js脚本 指定域名下的脚本
            // 'Content-Security-Policy': 'default-src \'self\' form-action \'self\'' // 限制表单只能提交到本站
            // 'Content-Security-Policy': 'script-src \'self\' form-action \'self\'' // 仅限制script
            'Content-Security-Policy': 'script-src \'self\' form-action \'self\'; report /report' // 报错发送报告
        })
        response.end(file);
    }
    
}).listen(9000, function(err) {
    if (err) {
        console.log(err)
    }
    console.log('服务创建成功');
});