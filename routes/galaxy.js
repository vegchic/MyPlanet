const Router = require('koa-router');

const galaxy  = require('../controllers/galaxy');

const router = new Router({ prefix: '/galaxies' });

router.get('/', async (ctx) => galaxy.getAll(ctx));

router.post('/', async (ctx) => galaxy.addOne(ctx));

router.get('/:gid', async (ctx) => galaxy.getOne(ctx));

router.delete('/:gid', async (ctx) => galaxy.deleteOne(ctx));

router.put('/:gid', async (ctx) => galaxy.update(ctx));

module.exports = router;