const { Router } = require('express');
const { renderHtml } = require('./service.js');
const router = Router();

router.get("/", renderHtml);

module.exports = router;