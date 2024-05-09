import { NestFactory } from "@nestjs/core";
import { ProfileModule } from "./profile.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from '@nestjs/common'
import { AvatarsModule } from "./avatars/avatars.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ProfileModule,
    new FastifyAdapter()
  );
  app.enableCors({
    origin: "*",
    credentials: true,
  });
  await app.listen(4002, '0.0.0.0', (err: Error, appURL: string) => {
    if (err) {
      console.log(err)

      return
    }

    const logger = new Logger()

    logger.log(`Server started at ${appURL}`)
    logger.log(`GraphQL URL ${appURL + '/graphql'}`)
  });
}
bootstrap();
