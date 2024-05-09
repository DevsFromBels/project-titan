import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsResolver } from './avatars.resolver';

@Module({
  providers: [AvatarsResolver, AvatarsService],
})
export class AvatarsModule {}
