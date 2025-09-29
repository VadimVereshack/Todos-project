const { Router } = require('express');
const { getMainHtml } = require('./service.js');
const router = Router();

router.get("/", getMainHtml);

module.exports = router;