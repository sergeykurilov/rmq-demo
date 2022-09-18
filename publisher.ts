import { connect } from "amqplib"

const run = async () => {
    try {
        const connection = await connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertExchange('test', 'topic', {durable: true});

        const queue = await channel.assertQueue('my-cool-queue', {durable: true});

        channel.bindQueue('my-cool-queue', 'test', 'my.commands');

        channel.publish('test', 'my.commands', Buffer.from('Работает!'));
        


    } catch (error) {
        console.error(error);   
    };
}


run();