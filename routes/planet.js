const Router = require('koa-router');

const planet = require('../controllers/planet');

const router = new Router({ prefix: 'planets' });

router.get('/', async (ctx) => planet.getAll(ctx));

router.post('/', async (ctx) => planet.addOne(ctx));

router.delete('/:pid', async (ctx) => planet.deleteOne(ctx));

router.get('/:pid', async (ctx) => planet.getOne(ctx));

router.put('/:pid', async (ctx) => planet.update(ctx));

module.exports = router;