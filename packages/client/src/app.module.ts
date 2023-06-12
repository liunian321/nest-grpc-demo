import { HELLO_PROTO_PACKAGE_NAME } from "@hello-world/common";
import { type DynamicModule, Module } from "@nestjs/common";
import {
  ClientsModule,
  type GrpcOptions,
  Transport,
} from "@nestjs/microservices";
import { join } from "path";

import { HELLO_WORLD_SERVICE } from "./constants/base.constant";
import { HelloProvider } from "./providers/hello.provider";

type PickedGrpcOptions = GrpcOptions["options"];

@Module({})
export class AppModule {
  public static register(
    options: Omit<PickedGrpcOptions, "protoPath" | "package">
  ): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ClientsModule.register([
          {
            transport: Transport.GRPC,
            name: HELLO_WORLD_SERVICE,
            options: {
              package: HELLO_PROTO_PACKAGE_NAME,
              protoPath: join(
                __dirname,
                "../node_modules/@hello-world/common/dist/hello.proto"
              ),
              ...options,
            },
          },
        ]),
      ],
      providers: [HelloProvider],
      exports: [HelloProvider],
    };
  }
}
