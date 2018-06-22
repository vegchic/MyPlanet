const Router = require('koa-router');

const auth = require('../controllers/auth');

const authRouter = new Router();

authRouter.post('/login', auth.login);

authRouter.get('/logout', auth.logout);

authRouter.post('/register', auth.register);

module.exports = authRouter;
