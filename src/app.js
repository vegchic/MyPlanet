import { join } from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import redisStore from 'koa-redis';

import passport from './services/passport';
import handleError from './services/handleError';
import router from './routes';
import { redis as redisConfig } from './config';

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

app.use(serve(join(__dirname, './public')));

app.use(router.routes());

app.listen(8080);
