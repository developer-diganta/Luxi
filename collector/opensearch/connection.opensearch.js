const { Client } = require('@opensearch-project/opensearch');

const host = process.env.OPENSEARCH_HOST || 'localhost';
const protocol = process.env.OPENSEARCH_PROTOCOL || 'http';
const port = process.env.OPENSEARCH_PORT ||  9200;
const node = protocol + '://' + host + ':' + port;
var client = new Client({
    node
});

module.exports = client;