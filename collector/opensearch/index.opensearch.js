const client = require('./connection.opensearch');

const index_name = process.env.OPENSEARCH_LOG_INDEX;

//for dev setup
const settings = {
    settings: {
        index: {
            number_of_shards: 1,
            number_of_replicas: 0,
        },
    },
};

const createIndex = async () => {
    try {
        const response = await client.indices.create({
            index: index_name,
            body: settings,
        });
        console.log("Index created:", response);
    } catch (err) {
       console.log(err)
    }
} 

module.exports = {
    createIndex
}
