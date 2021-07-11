import { tracer } from "./tracer";
import { amqpConsumer } from "../services/amqp-consumer-xsh-queue-svc";

(async () => {
  await amqpConsumer(tracer, (ch, msg) => {});
})();
