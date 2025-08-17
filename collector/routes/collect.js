const express = require('express');
const router = express.Router();
const { sendMetric } = require('../../kafka/producer');
const { addDocumentCollector } = require('../controller/collector.controller');

router.post('/', addDocumentCollector);

module.exports = router;
