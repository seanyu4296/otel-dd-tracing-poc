import "./tracer";

import { serverPublisher } from "../services/server";

// Publisher

(async () => {
  await serverPublisher("dd-server", 3000);
})();
