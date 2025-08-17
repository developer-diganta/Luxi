const { addDocumentService } = require("../service/collector.service");

const addDocumentCollector = async (req, res) => {
    try {
        const metric = req.body;
        addDocumentService(metric, 'logs');
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.error('Error publishing metric:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addDocumentCollector
}