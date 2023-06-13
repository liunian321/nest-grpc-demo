import { LoggerModule } from "@nest-boot/logger";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

const LoggerDynamicModule = LoggerModule.registerAsync({
  useFactory: () => ({}),
});

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerDynamicModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
