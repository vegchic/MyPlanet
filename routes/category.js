const Router = require('koa-router');

const contoller = require('../controllers/');

const router = new Router();

router.get('/:category/', contoller.getAll);

router.post('/:category/', contoller.addOne);

router.delete('/:category/:id', contoller.deleteOne);

router.get('/:category/:id', contoller.getOne);

router.put('/:category/:id', contoller.update);

module.exports = router;