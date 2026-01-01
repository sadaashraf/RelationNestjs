import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,   // MOST IMPORTANT
  //     whitelist: true,   // extra query fields remove kar dega
  //   }),
  // ),
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
