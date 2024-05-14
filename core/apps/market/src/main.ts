import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import multipart from "@fastify/multipart";
import { MarketModule } from "./market.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MarketModule,
    new FastifyAdapter()
  );
  await app.register(multipart, {
    limits: {
      fileSize: 1024 * 1024 * 3,
    },
  });

  app.useStaticAssets({
    root: join(__dirname, "..", "..", "uploads", "market"),
    prefix: "/uploads/market",
  });

  await app.listen(4004, "0.0.0.0");
}
bootstrap();
