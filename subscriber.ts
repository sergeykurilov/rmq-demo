import { connect } from "amqplib"

const run = async () => {
    try {
        const connection = await connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertExchange('test', 'topic', {durable: true});


        const queue = await channel.assertQueue('my-cool-queue', {durable: true});
        channel.bindQueue(queue.queue, 'test', 'my.commands');
        channel.consume(queue.queue, (message) => {
            if(!message) {
                return;
            }

            console.log(message.content.toString());
            channel.ack(message)
        }, {
            noAck: true
        })


    } catch (error) {
        console.error(error);   
    };
}


run();