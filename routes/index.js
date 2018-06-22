const Router = require('koa-router');

const authRouter = require('./auth');
const usrRouter = require('./user');

const router = new Router();

router.use(authRouter.routes());

router.all('/*', async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        console.log('未登录');
        ctx.body = 'hello world';
    } else {
        console.log('已登录');
        return next();
    }
});

router.use(usrRouter.routes());

module.exports = router;
