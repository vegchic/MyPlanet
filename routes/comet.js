const Router = require('koa-router');

const comet = require('../controllers/comet');

const router = new Router({ prefix: '/comets' });

router.get('/', async (ctx) => comet.getAll(ctx));

router.post('/', async (ctx) => comet.addOne(ctx));

router.delete('/:cid', async (ctx) => comet.deleteOne(ctx));

router.get('/:cid', async (ctx) => comet.getOne(ctx));

router.put('/:cid', async (ctx) => comet.update(ctx));

module.exports = router;