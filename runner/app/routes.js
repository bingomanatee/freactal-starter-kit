const Router = require('koa-router');
const runnerController = require('./controllers/runner');
const pageController = require('./controllers/pages');
const wizardMakerController = require('./controllers/wizardMaker');

const router = new Router();

router.get('/runner/reload', runnerController.reload);
router.get('/runner/stop', runnerController.stop);
router.get('/api/pages', pageController.all);
router.post('/api/wizard-maker', wizardMakerController.make);
module.exports = router;
