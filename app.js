const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const redisStore = require('koa-redis');

const passport = require('./services/passport');
const handleError = require('./services/handleError');
const router = require('./routes');
const { redis: redisConfig } = require('./config');

const app = new Koa();

app.keys = ['myPlanet'];

app.use(logger());
app.use(handleError);

app.use(bodyParser());
app.use(session({
    maxAge: 86400000,
    store: redisStore(redisConfig),
}, app));

app.use(passport.initialize());
app.use(passport.session());

app.use(serve(path.join(__dirname, './public')));

app.use(router.routes());

module.exports = app;
