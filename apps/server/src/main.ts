import { Logger } from "@nest-boot/logger";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type GrpcOptions, Transport } from "@nestjs/microservices";
import { USER_PROTO_PACKAGE_NAME } from "@user-management/common";
import ms from "ms";
import { join } from "path";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const logger = await app.resolve(Logger);

  app.useLogger(logger);

  process.on("unhandledRejection", (err) => {
    logger.error("unhandled exception", { err });
  });

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  // gRPC options
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      // listen on all IPv4 interfaces
      url: `0.0.0.0:${+configService.get("PORT", 5000)}`,
      package: USER_PROTO_PACKAGE_NAME,
      protoPath: join(__dirname, "../../../packages/common/dist/user.proto"),
      keepalive: {
        keepaliveTimeMs: +configService.get("GRPC_KEEPALIVE_TIME_MS", ms("9m")),
        keepaliveTimeoutMs: +configService.get(
          "GRPC_KEEPALIVE_TIMEOUT_MS",
          ms("10m")
        ),
      },
    },
  });

  await app.startAllMicroservices();

  // http port
  await app.listen(+configService.get("PORT", 3001));
}
void bootstrap();
