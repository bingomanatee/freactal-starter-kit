'use strict';

const Router = require('koa-router');
const runnerController = require('./controllers/runner');


const router = new Router();
//router.get('/', homeController.getApiInfo);
// //router.get('/spec', homeController.getSwaggerSpec);

router.get('/runner/reload', runnerController.reload);
router.get('/runner/stop', runnerController.stop);

module.exports = router;
