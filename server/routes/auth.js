import Router from 'koa-router';

import { login, logout, register, isAuth } from '../controllers/auth';

const authRouter = new Router();

authRouter.post('/login', login);

authRouter.get('/logout', logout);

authRouter.post('/register', register);

authRouter.get('/isAuth', isAuth);

export default authRouter;
