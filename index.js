const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();

app.use(logger());

app.use(bodyParser());

app.use(serve(path.join(__dirname, './public')));

// app.use(views(path.join(__dirname, './views'), {
//   extension: 'html',
// }));

app.listen(8080);
