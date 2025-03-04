import { Cloud } from './dto/entities/cloud.entity';

export const CloudProviders = [
  {
    provide: 'CloudRepository',
    useValue: Cloud,
  },
];
