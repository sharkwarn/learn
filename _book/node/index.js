const http = require('http');
const fs = require('fs');
const path = require('path');
// 引入net模块
const net = require('net')


http.createServer(function(req, res) {
    console.log(req.url);
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, './static/index.html'), function(err, data) {
            console.log(err);
            if (err) {
                res.writeHead(500, 'error')
                res.end();
            } else {
                res.setHeader('Content-Type','text/html; charset=utf-8')
                res.write(data);
                res.end()
            }
        });
    } 
}).listen(8888, function(...arg) {
    
});


const server = net.createServer((socket) => {
    socket.once('data', (buffer) => {
        // 接收到HTTP请求头数据
        const str = buffer.toString()
        console.log(str)
    });
}).on('error', function() {
    console.log(11111);
})

server.listen(8080)