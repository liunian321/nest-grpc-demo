import { NestFactory } from "@nestjs/core";

import { ExampleModule } from "./example.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ExampleModule);
  await app.listen(3002);
}
bootstrap();
