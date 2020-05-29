const Koa = require('koa');
const app = new Koa();

let num = 0;
app.use(async ctx => {
    console.log(num);
    num++;
    ctx.body = 'Hello World';
    ctx.cookies.set('a', '333')
});

app.listen(3000);