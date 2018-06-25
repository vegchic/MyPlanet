const Router = require('koa-router');
const search = require('../controllers/search')();

const router = new Router({ prefix: '/search' });

router.get('/', search);

module.exports = router;