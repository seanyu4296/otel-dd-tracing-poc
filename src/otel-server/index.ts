import "./tracer";

import { serverPublisher } from "../services/server";

(async () => {
  await serverPublisher("otel-server", 3001);
})();
