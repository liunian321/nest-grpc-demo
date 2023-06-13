import { type DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { USER_PROTO_PACKAGE_NAME } from "@user-management/common";

import { UserService } from "./services";
import {
  type ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  type OPTIONS_TYPE,
} from "./user.module.definition";
import { type UserModuleOptions } from "./user.module.options.interface";

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return this.withClient(super.register(options));
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return this.withClient(super.registerAsync(options));
  }

  private static withClient(dynamicModule: DynamicModule): DynamicModule {
    const ClientDynamicModule = ClientsModule.registerAsync([
      {
        name: USER_PROTO_PACKAGE_NAME,
        imports: [dynamicModule],
        inject: [MODULE_OPTIONS_TOKEN],
        useFactory: async (options: UserModuleOptions) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: USER_PROTO_PACKAGE_NAME,
              protoPath: require.resolve(
                "@user-management/common/dist/user.proto"
              ),
              ...options,
            },
          };
        },
      },
    ]);

    dynamicModule.imports = [
      ...(dynamicModule.imports ?? []),
      ClientDynamicModule,
    ];

    dynamicModule.exports = [
      ...(dynamicModule.exports ?? []),
      MODULE_OPTIONS_TOKEN,
    ];

    return dynamicModule;
  }
}
