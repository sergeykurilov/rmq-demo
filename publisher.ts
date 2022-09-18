import { connect } from "amqplib"

const run = async () => {
    try {
        const connection = await connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertExchange('test', 'topic', {durable: true});

        const replyQueue = await channel.assertQueue('', {exclusive: true});

        channel.consume(replyQueue.queue, (message) => {
            console.log(message?.content.toString());
            console.log(message?.properties.correlationId);
        })

        channel.publish('test', 'my.commands', Buffer.from('Работает!'), {
            replyTo: replyQueue.queue,
            correlationId: '1'
        });
        



    } catch (error) {
        console.error(error);   
    }
}


run();