import { Module } from "@nestjs/common";
import { UserModule } from "@user-management/client";

import { AppController } from "./app.controller";

@Module({
  imports: [
    UserModule.register({
      url: process.env.GRPC_URL,
    }),
  ],
  controllers: [AppController],
})
export class ExampleModule {}
