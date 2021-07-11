const concurrently = require("concurrently");

(async () => {
  await concurrently([
    {
      command: "tsnd --respawn ./src/dd-server/index.ts",
      name: "dd-server",
      prefixColor: "red",
    },
    // {
    //   command: "tsnd --respawn ./src/dd-consumer/index.ts",
    //   name: "dd-consumer",
    //   prefixColor: "yellow",
    // },
    {
      command: "tsnd --respawn ./src/dd-consumer/index-qs.ts",
      name: "dd-consumer-qs",
      prefixColor: "yellow",
    },
    {
      command: "tsnd --respawn ./src/otel-server/index.ts",
      name: "otel-server",
      prefixColor: "blue", //    - Available colors: black, red, green, yellow, blue,      magenta, cyan, white, gray, or any hex values for
    },
    // {
    //   command: "tsnd --respawn ./src/otel-consumer/index.ts",
    //   name: "otel-consumer",
    //   prefixColor: "cyan",
    // },
  ]);
})();
