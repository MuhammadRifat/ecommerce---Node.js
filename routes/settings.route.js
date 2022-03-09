const express = require('express');
const { getSliders } = require('../controllers/settings.controller');
const router = express.Router();

router.get('/sliders', getSliders);

module.exports = router;