require('dotenv').config();
const { Kafka } = require('kafkajs');
const { addDocument } = require('../collector/repository/collector.repository');
const kafka = new Kafka({ clientId: 'luxi-consumer', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'luxi-group' })
const batch = [];
const FLUSH_INTERVAL = 600000;
const BATCH_SIZE = 10;

const flushBatch = async () => {
    console.log({ batch })
    if (batch.length === 0) return;
    const docsToInsert = [...batch];
    batch = []
    try {
        await Promise.all(
            docsToInsert.map(({ data, index }) =>
                addDocument(data, index)
            )
        );
        console.log(`Flushed ${docsToInsert.length} docs`);
    } catch (error) {
        console.log(error)
    }
}

const runConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const parsed = JSON.parse(message.value.toString());
            const { index, data } = parsed;
            batch.push({
                data, index
            });

            if (batch.length >= BATCH_SIZE) {
                await flushBatch();
            }

        }
    });

    setInterval(flushBatch, FLUSH_INTERVAL)
}


module.exports = runConsumer;
