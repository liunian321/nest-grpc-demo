import { repl } from "@nestjs/core";
import * as dotenv from "dotenv";
import ms from "ms";
import { HelloWorldModule } from "./hello-world.module";

const config = dotenv.config().parsed;

void (async () => {
  if (typeof config === "undefined") {
    throw new Error("No .env file found");
  }

  const replServer = await repl(
    HelloWorldModule.register({
      url: config.GRPC_URL,
      keepalive: {
        keepaliveTimeMs: Number(config.KEEPALIVE_TIMEOUT_MS || ms("10m")),
        keepaliveTimeoutMs: Number(config.KEEPALIVE_TIME_MS || ms("10m")),
      },
    })
  );

  console.log("Starting REPL...");

  replServer.setupHistory(".repl_history", (err) => {
    if (err !== null) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
})();
