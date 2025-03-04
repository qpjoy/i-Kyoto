import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { SocketService } from './socket/socket.service';

@Global()
@Module({
  providers: [ConfigService, SocketService],
  exports: [ConfigService, SocketService],
  imports: [],
  controllers: [],
})
export class SharedModule {}
