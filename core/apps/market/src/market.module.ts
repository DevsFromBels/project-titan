import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MarketIdService } from './market-id/market-id.service';
import { MarketSubscriptionsService } from './market-subscriptions/market-subscriptions.service';

@Module({
  imports: [],
  controllers: [MarketController],
  providers: [MarketService, PrismaService, JwtService, ConfigService, MarketIdService, MarketSubscriptionsService],
})
export class MarketModule {}
