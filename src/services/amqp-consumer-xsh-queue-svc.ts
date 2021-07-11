import * as amqp from "amqplib";
import { QUEUE_NAME } from "./common";
import { RabbitMQ } from "@boxbag/xsh-node-queue-service";
import { Tracer } from "dd-trace";

export async function amqpConsumer(
  tracer: Tracer,
  consumer: (chann: amqp.Channel, msg: amqp.ConsumeMessage | null) => void
): Promise<void> {
  const c = await amqp.connect("amqp://localhost:5672");
  const ch = await c.createChannel();
  await ch.assertQueue(QUEUE_NAME);
  const subMgr = new RabbitMQ.SubscriberManager();
  subMgr.addSubscriber(
    new RabbitMQ.Subscriber(ch, {
      queueName: QUEUE_NAME,
      handler: async () => {
        console.log("HELLOOOO");
        await new Promise((res) => setTimeout(res, 5000));
      },
      tracer,
    })
  );
  await subMgr.startAll();
}
