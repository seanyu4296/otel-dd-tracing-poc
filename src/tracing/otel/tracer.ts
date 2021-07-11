import { NodeTracerProvider } from "@opentelemetry/node";
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/tracing";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
//// core otel library
// import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
//// aspectio
import { ExpressInstrumentation } from "opentelemetry-instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector";
import { Resource } from "@opentelemetry/resources";
import { ResourceAttributes } from "@opentelemetry/semantic-conventions";
import * as opentelemetry from "@opentelemetry/api";
import { IdGenerator, RandomIdGenerator } from "@opentelemetry/core";
import { AmqplibInstrumentation } from "opentelemetry-instrumentation-amqplib";
import { DatadogPropagator } from "../custom-datadog/datadog-propagator";

//TODO:  WHATS THE DIFFERENCE BETWEEN NodeTracerProvider vs BasicTracerprovider
export function initTracer(serviceName: string): void {
  const provider: NodeTracerProvider = new NodeTracerProvider({
    resource: new Resource({
      [ResourceAttributes.SERVICE_NAME]: serviceName,
      [ResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "local-sean",
    }),
  });

  // TODO: datadog propagator?
  // can set propagator here
  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new CollectorTraceExporter({
        hostname: "still-idk-whats-this", // TODO: is this correct https://github.com/open-telemetry/opentelemetry-js/blob/a3b77387012a5f53c193efdefcbf5f6272876e4d/packages/opentelemetry-exporter-collector/src/types.ts#L343
      })
    )
  );
  // provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.register({
    // very important for compatibility across other Datadog agent dependent services
    propagator: new DatadogPropagator(), // 10:26
  });

  registerInstrumentations({
    instrumentations: [
      new ExpressInstrumentation(),
      new HttpInstrumentation(),
      new AmqplibInstrumentation({
        // see under for available configuration
      }),
    ],
  });
}

export const tracer = opentelemetry.trace.getTracer("what-is-this-tracer");
