import { Code } from './entities/code.entity';

export const CodesProviders = [
  {
    provide: 'CodesRepository',
    useValue: Code,
  },
];
