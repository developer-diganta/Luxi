const client = require("../opensearch/connection.opensearch");

const addDocument = async (document, index) => await client.index({
    index,
    body: document,
    refresh: true,
});

module.exports = {
    addDocument
}