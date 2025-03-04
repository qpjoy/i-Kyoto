import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesProviders } from './messages.providers';

@Module({
  controllers: [MessagesController],
  providers: [...MessagesProviders, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
