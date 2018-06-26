const Router = require('koa-router');

const authRouter = require('./auth');
const usrRouter = require('./user');
const searchRouter = require('./search');
const category = require('./category');

const router = new Router( {prefix: '/api'} );

router.use(authRouter.routes());

router.all('/*', async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {status: false, err: '未登录'};
    } else {
        return next();
    }
});

router.use(searchRouter.routes());

router.use(usrRouter.routes());

router.use(category.routes());

// router.use(galRouter.routes());

// router.use(starRouter.routes());

// router.use(planRouter.routes());

// router.use(comRouter.routes());

// router.use(sateRouter.routes());

module.exports = router;
