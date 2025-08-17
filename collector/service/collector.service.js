const { sendMetric } = require("../../kafka/producer");
const { addDocument } = require("../repository/collector.repository");

const addDocumentService = async (data, index) => {
    try {
        await sendMetric(data,index);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addDocumentService
}