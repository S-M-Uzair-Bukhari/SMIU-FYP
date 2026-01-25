const express = require('express');
const router = express.Router();
const controllers = require('../controllers/feedback');
const middleware = require('../middleware/auth');

router.post('/addFeedback', controllers.addFeedback);
router.get('/getfeedbacks', controllers.getFeedback);
router.post('/deleteFeedback', controllers.deleteFeedback);

module.exports = router;
