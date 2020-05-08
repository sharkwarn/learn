const Koa = require('koa');
const app = new Koa();


let num = 0;
app.use(async ctx => {
  ctx.body = 'Hello World';
  ctx.cookies.set('b', '333')
});

app.listen(4000);