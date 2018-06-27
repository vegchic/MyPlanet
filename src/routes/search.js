import Router from 'koa-router';
import search from '../controllers/search';

const searchRouter = new Router({ prefix: '/search' });

searchRouter.get('/', search());

export default searchRouter;