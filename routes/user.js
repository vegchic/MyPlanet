const Router = require('koa-router');

const user = require('../controllers/user');

const usrRouter = new Router({ prefix: '/profile' });

usrRouter.put('/', user.update);

usrRouter.get('/', user.getDetail);

usrRouter.post('/password', user.changePwd);

usrRouter.post('/avatar', user.uploadAvatar, user.saveName);

usrRouter.get('/avatar', user.getAvatar);

module.exports = usrRouter;
