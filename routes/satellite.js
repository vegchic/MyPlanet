const Router = require('koa-router');

const satellite = require('../controllers/satellite');

const router = new Router({ prefix: 'satellites' });

router.get('/', async (ctx) => satellite.getAll(ctx));

router.post('/', async (ctx) => satellite.addOne(ctx));

router.delete('/:sid', async (ctx) => satellite.deleteOne(ctx));

router.get('/:sid', async (ctx) => satellite.getOne(ctx));

router.put('/:sid', async (ctx) => satellite.update(ctx));

module.exports = router;