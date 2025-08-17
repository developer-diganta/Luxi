const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'luxi-collector',
    brokers: [process.env.KAFKA_BROKER],
})

const producer = kafka.producer()

const connectProducer = async () => {
    await producer.connect();
};

const sendMetric = async (data, index) => {
    await producer.send({
        topic: process.env.KAFKA_TOPIC,
        messages: [{ value: JSON.stringify({ data, index }) }],
    });
};

module.exports = { connectProducer, sendMetric };

