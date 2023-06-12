import { repl } from "@nestjs/core";
import * as dotenv from "dotenv";
import { isEmpty } from "lodash";
import ms from "ms";

import { AppModule } from "./app.module";

const config = dotenv.config().parsed;

void (async () => {
  if (typeof config === "undefined") {
    throw new Error(".env file not found");
  }

  const replServer = await repl(
    AppModule.register({
      url: config.GRPC_URL,
      keepalive: {
        keepaliveTimeMs: isEmpty(config.KEEPALIVE_TIMEOUT_MS)
          ? ms("10m")
          : parseInt(config.KEEPALIVE_TIMEOUT_MS),
        keepaliveTimeoutMs: isEmpty(config.KEEPALIVE_TIME_MS)
          ? ms("10m")
          : parseInt(config.KEEPALIVE_TIMEOUT_MS),
      },
    })
  );

  replServer.setupHistory(".repl_history", (err) => {
    if (err !== null) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
})();
