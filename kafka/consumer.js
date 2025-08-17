require('dotenv').config();
const { Kafka } = require('kafkajs');
const { addDocument } = require('../collector/repository/collector.repository');
const kafka = new Kafka({ clientId: 'luxi-consumer', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'luxi-group' })

const runConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const parsed = JSON.parse(message.value.toString());
            const { index, data } = parsed;
            const response = await addDocument(data, index);
            console.log(response)
        }
    });
}


module.exports = runConsumer;
