import {
  HELLO_SERVICE_NAME,
  type HelloRequest,
  type HelloResponse,
  type HelloServiceClient,
} from "@hello-world/common";
import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import { ClientGrpc, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

import { HELLO_WORLD_SERVICE } from "../constants/base.constant";

@Injectable()
export class HelloProvider implements OnModuleInit {
  constructor(
    @Inject(HELLO_WORLD_SERVICE) public readonly client: ClientGrpc
  ) {}

  private helloServiceClient?: HelloServiceClient;

  onModuleInit(): void {
    this.helloServiceClient =
      this.client.getService<HelloServiceClient>(HELLO_SERVICE_NAME);
  }

  async hello(data: HelloRequest): Promise<HelloResponse> {
    const helloResponse = this.helloServiceClient?.hello(data);
    if (typeof helloResponse === "undefined") {
      throw new RpcException("helloServiceClient is undefined");
    }
    // Convert Observable object to promise object
    return await firstValueFrom(helloResponse);
  }
}
