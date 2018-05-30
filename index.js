const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const view = require('koa-views');
const bodyParser = require('koa-bodyparser');

const app = new koa();

app.use(bodyParser());

app.use(serve(path.join(__dirname + './public')));

app.use(view(path.join(__dirname, './views')));

app.listen(8800);