import { join } from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import redisStore from 'koa-redis';
import cors from '@koa/cors';

import passport from './services/passport';
import handleError from './services/handleError';
import router from './routes';
import { redis as redisConfig } from './config';

const app = new Koa();

app.keys = ['myPlanet'];

app.use(logger());
app.use(handleError);

app.use(cors());

app.use(bodyParser());
app.use(session({
    store: redisStore(redisConfig),
}, app));

app.use(passport.initialize());
app.use(passport.session());

app.use(serve(join(__dirname, '../client/dist')));

app.use(router.routes());

app.use(async (ctx) => {
    ctx.redirect('/');
});

app.listen(8080);
