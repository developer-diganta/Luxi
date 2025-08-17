require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectProducer } = require('../kafka/producer');
const runConsumer = require('../kafka/consumer');
const collectRoute = require('./routes/collect');
const { createIndex } = require('./opensearch/index.opensearch');

const app = express();
const PORT = process.env.PORT || 4000;
createIndex();
app.use(cors());
app.use(express.json());
app.use('/collect', collectRoute);

connectProducer()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Luxi Collector API running at http://localhost:${PORT}`);
            runConsumer(); // ✅ Call directly here
        });
    })
    .catch(err => {
        console.error('Failed to start Kafka producer:', err);
    });
