import "./tracer";

import { amqpConsumer } from "../services/amqp-consumer";

(async () => {
  await amqpConsumer(async (ch, msg) => {
    if (msg) {
      // TODO: need to add proper resource name and tags
      await new Promise((res) => setTimeout(res, 2000));
      ch.ack(msg);
    }
  });
})();
