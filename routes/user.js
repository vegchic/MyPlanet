const Router = require('koa-router');

const user = require('../controllers/user');

const usrRouter = new Router({ prefix: '/profile' });

usrRouter.get('/', user.getProfile);

usrRouter.put('/', user.update);

usrRouter.put('/password', user.changePwd);

usrRouter.post('/avatar', user.uploadAvatar, user.saveName);

module.exports = usrRouter;
