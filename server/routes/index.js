import Router from 'koa-router';

import authRouter from './auth';
import usrRouter from './user';
import searchRouter from './search';
import category from './category';

const router = new Router({ prefix: '/api' });

router.use(authRouter.routes());

router.all('/*', async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = { status: false, err: '未登录' };
    } else {
        return next();
    }
});

router.use(searchRouter.routes());

router.use(usrRouter.routes());

router.use(category.routes());

export default router;
