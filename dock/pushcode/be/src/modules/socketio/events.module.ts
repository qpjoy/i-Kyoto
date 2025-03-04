import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '../../shared/config/config.service';
import { UsersModule } from '../users/users.module';
import { SocketService } from 'src/shared/socket/socket.service';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: {
          ...configService.redis,
          onClientReady: () => {
            console.log(`[RedisModule]: `, 'injected');
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
