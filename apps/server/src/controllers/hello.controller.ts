import { HelloRequest, HelloResponse } from "@hello-world/common";
import { Logger } from "@nest-boot/logger";
import { Controller } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";

import { HelloProvider } from "../providers/hello.provider";

@Controller()
export class HelloController {
  constructor(
    private readonly logger: Logger,
    private readonly helloProvider: HelloProvider
  ) {
    this.logger.setContext(HelloController.name);
  }

  @GrpcMethod("HelloService")
  hello(requestData: HelloRequest): HelloResponse {
    try {
      return this.helloProvider.getMessage(requestData);
    } catch (e) {
      this.logger.error("error", e);
      throw new RpcException("request failed");
    }
  }
}
