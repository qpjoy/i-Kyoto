import { Message } from './entities/messages.entity';

export const MessagesProviders = [
  {
    provide: 'MessagesRepository',
    useValue: Message,
  },
];
