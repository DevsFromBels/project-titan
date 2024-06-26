import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import multipart from "@fastify/multipart";

import { join } from "path";
import { AvatarsModule } from "./avatars.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AvatarsModule,
    new FastifyAdapter()
  );

  app.enableCors({
    origin: [
      "https://admin.titanproject.top",
      "https://titanproject.top",
      "https://iframe-api.titanproject.top",
    ],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "accesstoken",
      "refreshtoken",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  await app.register(multipart, {
    limits: {
      fileSize: 1024 * 1024 * 3,
    },
  });

  app.useStaticAssets({
    root: join(__dirname, "..", "..", "uploads", "avatars"),
    prefix: "/uploads/avatars",
  });

  await app.listen(4003, "0.0.0.0");
}
bootstrap();
