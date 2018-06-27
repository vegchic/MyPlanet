import Router from 'koa-router';

import { login, logout, register } from '../controllers/auth';

const authRouter = new Router();

authRouter.post('/login', login);

authRouter.get('/logout', logout);

authRouter.post('/register', register);

export default authRouter;
