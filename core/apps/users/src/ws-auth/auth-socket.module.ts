import { Module } from '@nestjs/common';
import { AuthSocketGateway } from './auth-socket.gateway';

@Module({
  providers: [AuthSocketGateway],
})
export class AuthSocketModule {}