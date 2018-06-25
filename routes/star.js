const Router = require('koa-router');

const star = require('../controllers/star');

const router = new Router({ prefix: '/stars' });

router.get('/', async (ctx) => star.getAll(ctx));

router.post('/', async (ctx) => star.addOne(ctx));

router.delete('/:sid', async (ctx) => star.deleteOne(ctx));

router.get('/:sid', async (ctx) => star.getOne(ctx));

router.put('/:sid', async (ctx) => star.update(ctx));

module.exports = router;