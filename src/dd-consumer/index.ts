// https://app.datadoghq.com/apm/traces?query=env%3Alocal-sean&graphType=flamegraph&spanID=2676823558517863600&streamTraces=true&traceID=8383724660644987437&start=1624698554726&end=1624699454726&paused=false
import * as amqp from "amqplib";
import { tracer } from "./tracer";

import { amqpConsumer } from "../services/amqp-consumer";

// TODO: fix xsh-go-tracing first
// TODO: try fanout
// TODO: try with xendit-queue-service
// TODO: test otel amqp
// TODO: read staff engineer

// https://app.datadoghq.com/apm/resource/dd-consumer/amqp.consumeHandler/e1494b1e0c4e71c4?query=env%3Alocal-sean%20service%3Add-consumer%20operation_name%3Aamqp.consumeHandler%20resource_name%3A%22no-exchange%20tasks%22&env=local-sean&event=AQAAAXpNz17z5XMOTwAAAABBWHBOejJ1WUFBQTlPQURmeWJ2X3lZeEM&index=apm-search&spanID=6599087287027667718&traceID=4795271549903187511&start=1624790614775&end=1624877014775&paused=false
(async () => {
  await amqpConsumer((ch, msg) => {
    if (msg) {
      const childOf = tracer.extract("text_map", msg.properties.headers);
      // TODO: need to add proper resource name and tags
      tracer.trace(
        "amqp.consumeHandler", // TODO: communicate to people this becomes the "Operation name" in Datadog
        {
          ...(childOf ? { childOf } : {}),
          resource: `${"queue-name"}
          ${msg.fields.exchange ? msg.fields.exchange : "no-exchange"} ${
            msg.fields.routingKey ? msg.fields.routingKey : "no-routing-key"
          }`,
          tags: {
            test_filter_tag: "test",
            span: {
              type: "worker",
              kind: "consumer",
            },
          },
        },
        async () => {
          await new Promise((res) => setTimeout(res, 2000));
          const span = tracer.scope().active();
          const error = new Error("test error");
          if (span) {
            span.addTags({
              "error.type": error.name,
              "error.msg": error.message,
              "error.stack": error.stack,
            });
          }
          ch.ack(msg);
        }
      );
    }
  });
})();

// https://app.datadoghq.com/apm/traces?query=env%3Alocal-sean&graphType=flamegraph&spanID=3264807029028795502&streamTraces=true&traceID=4252768335454542066&start=1624697474659&end=1624698374659&paused=false
