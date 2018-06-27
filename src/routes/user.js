import Router from 'koa-router';

import { update, getDetail, changePwd, uploadAvatar, getAvatar } from '../controllers/user';

const usrRouter = new Router({ prefix: '/profile' });

usrRouter.put('/', update);

usrRouter.get('/', getDetail);

usrRouter.post('/password', changePwd);

usrRouter.post('/avatar', uploadAvatar);

usrRouter.get('/avatar', getAvatar);

export default usrRouter;
