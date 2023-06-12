import { HELLO_PROTO_PACKAGE_NAME } from "@hello-world/common";
import { Logger } from "@nest-boot/logger";
import { RequestContextInterceptor } from "@nest-boot/request-context";
import { ConfigService } from "@nestjs/config";
import { DiscoveryService, NestFactory } from "@nestjs/core";
import { type GrpcOptions, Transport } from "@nestjs/microservices";
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
  const microservice = app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      // listen on all IPv4 interfaces
      url: `0.0.0.0:${+configService.get("PORT", 5000)}`,
      package: HELLO_PROTO_PACKAGE_NAME,
      protoPath: join(
        __dirname,
        "../node_modules/@hello-world/common/dist/hello.proto"
      ),
      keepalive: {
        keepaliveTimeMs: +configService.get("GRPC_KEEPALIVE_TIME_MS", ms("9m")),
        keepaliveTimeoutMs: +configService.get(
          "GRPC_KEEPALIVE_TIMEOUT_MS",
          ms("10m")
        ),
      },
    },
  });

  // microservice start
  microservice.useGlobalInterceptors(
    new RequestContextInterceptor(app.get(DiscoveryService))
  );

  await app.startAllMicroservices();

  // http port
  await app.listen(+configService.get("PORT", 3001));
}
void bootstrap();
