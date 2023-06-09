import {
  ClientsModule,
  type GrpcOptions,
  Transport,
} from "@nestjs/microservices";
import { join } from "path";
import { type DynamicModule, Module } from "@nestjs/common";
import { HELLO_PROTO_PACKAGE_NAME } from "@hello-world/common";
import { HelloService } from "./hello.service";

type PickedGrpcOptions = GrpcOptions["options"];

@Module({})
export class HelloWorldModule {
  public static register(
    options: Omit<PickedGrpcOptions, "protoPath" | "package">
  ): DynamicModule {
    return {
      module: HelloWorldModule,
      imports: [
        ClientsModule.register([
          {
            transport: Transport.GRPC,
            name: "HELLO_WORLD_SERVICE",
            options: {
              package: HELLO_PROTO_PACKAGE_NAME,
              protoPath: join(
                __dirname,
                "../node_modules/@facebook-cancel-like-page/common/dist/cancel-like-page.proto"
              ),
              ...options,
            },
          },
        ]),
      ],
      providers: [HelloService],
      exports: [HelloService],
    };
  }
}
