"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, amqplib_1.connect)('amqp://localhost');
        const channel = yield connection.createChannel();
        yield channel.assertExchange('test', 'topic', { durable: true });
        const queue = yield channel.assertQueue('my-cool-queue', { durable: true });
        channel.bindQueue(queue.queue, 'test', 'my.commands');
        channel.consume(queue.queue, (message) => {
            if (!message) {
                return;
            }
            console.log(message.content.toString());
        });
    }
    catch (error) {
        console.error(error);
    }
    ;
});
run();
