import { Help } from './entities/help.entity';

export const HelpsProviders = [
  {
    provide: 'HelpsRepository',
    useValue: Help,
  },
];
