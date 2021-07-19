import * as amqp from "amqplib";
import { QUEUE_NAME } from "./common";

export async function amqpConsumer(
  exchangeName: string,
  queueName: string,
  consumer: (chann: amqp.Channel, msg: amqp.ConsumeMessage | null) => void
): Promise<void> {
  const c = await amqp.connect("amqp://localhost:5672");
  const ch = await c.createChannel();
  await ch.assertQueue(queueName);
  await ch.bindQueue(queueName, exchangeName, "test.#");

  await ch.consume(queueName, (msg) => {
    console.log("headers:::", JSON.stringify(msg?.properties.headers, null, 2));
    consumer(ch, msg);
  });
}
