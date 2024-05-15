import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { PrismaService } from "../../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ProfileResolver } from "./profile.resolver";
import { SettingsService } from "./services/settings/settings.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  controllers: [],
  providers: [
    ProfileService,
    ConfigService,
    PrismaService,
    JwtService,
    ProfileResolver,
    SettingsService
  ],
})
export class ProfileModule {}
