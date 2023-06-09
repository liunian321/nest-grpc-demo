import { ClientGrpc, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  HELLO_SERVICE_NAME,
  HelloRequest,
  HelloResponse,
  HelloServiceClient,
} from "@hello-world/common";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class HelloService implements OnModuleInit {
  constructor(
    @Inject("HELLO_WORLD_SERVICE") public readonly client: ClientGrpc
  ) {}

  private helloServiceClient?: HelloServiceClient;

  onModuleInit(): void {
    this.helloServiceClient =
      this.client.getService<HelloServiceClient>(HELLO_SERVICE_NAME);
  }

  async getHello(data: HelloRequest): Promise<HelloResponse> {
    const helloResponse = this.helloServiceClient?.hello(data);
    if (typeof helloResponse === "undefined") {
      throw new RpcException("helloServiceClient is undefined");
    }
    return await firstValueFrom(helloResponse);
  }
}
