import Router from 'koa-router';

import { getAll, addOne, deleteOne, getOne, update } from '../controllers/';

const cateRouter = new Router();

cateRouter.get('/:category/', getAll);

cateRouter.post('/:category/', addOne);

cateRouter.delete('/:category/:id', deleteOne);

cateRouter.get('/:category/:id', getOne);

cateRouter.put('/:category/:id', update);

export default cateRouter;