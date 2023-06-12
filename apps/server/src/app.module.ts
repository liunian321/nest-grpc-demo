import { LoggerModule } from "@nest-boot/logger";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DiscoveryService } from "@nestjs/core";

import { HelloController } from "./controllers/hello.controller";
import { HelloProvider } from "./providers/hello.provider";

const LoggerDynamicModule = LoggerModule.registerAsync({
  useFactory: () => ({}),
});

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerDynamicModule],
  controllers: [HelloController],
  providers: [DiscoveryService, HelloProvider],
})
export class AppModule {}
