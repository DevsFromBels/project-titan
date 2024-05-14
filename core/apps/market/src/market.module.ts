import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [MarketController],
  providers: [MarketService, PrismaService, JwtService, ConfigService],
})
export class MarketModule {}
